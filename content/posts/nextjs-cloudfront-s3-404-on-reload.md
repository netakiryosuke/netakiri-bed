---
title: "Next.jsの静的サイトをCloudFront + S3にデプロイしたらリロードで404になった"
date: "2026-04-22"
tags: ["Next.js", "AWS"]
description: Next.js の静的エクスポートを CloudFront + S3 (OAC) で配信したとき、リロードすると404になる問題にハマった話です。
---

&nbsp;

このブログが完成して、意気揚々とデプロイしたときの話です。

トップページからリンクをクリックして記事を開く。問題なし。
レイアウトも崩れてない。よしよし。

念のためリロードしてみると、**404ページ**。

・・・え？

慌てて開発サーバで確認したところ、404 にはならず。・・・もしかしてインフラの問題ってこと？面倒なことになったな～～～と思いながら調査をはじめました。

## 何が起きていたんだ

このブログは Next.js (App Router) で構築しており、`output: 'export'` で静的 HTML を生成して S3 にアップロード、CloudFront 経由で配信しています。

症状をまとめるとこうです。

| 操作 | 結果 |
|---|---|
| トップページを開く | ✅ 正常 |
| リンクをクリックして記事に遷移 | ✅ 正常 |
| 記事ページをリロード | ❌ 404 |
| 記事のURLを（curlコマンドなどで）直接開く | ❌ 404 |

つまり、**クライアントサイドナビゲーションでは問題ないのに、サーバーへのリクエストが発生すると404になる**。

## なぜ初回遷移は成功したんだ

Next.js の `<Link>` によるページ遷移は、ブラウザが実際に HTTP リクエストを送りません。JavaScript が DOM を書き換えるだけです。

つまり S3 上にファイルがあろうがなかろうが関係ないのです。

一方、リロードや直接 URL アクセスでは**ブラウザが CloudFront に HTTP リクエストを送る**ので、S3 上のファイルパスと URL が一致しないと 404 になります。（厳密には 403 を 404 ページにリダイレクトしている）

## 原因

Next.js の `output: 'export'` は、デフォルトで各ページを `.html` ファイルとして出力します。

```
out/
├── index.html
├── about.html
├── posts/
│   ├── my-article.html
│   └── another-post.html
└── tags/
    ├── Next.js.html
    └── Python.html
```

CloudFront + S3 (OAC) の構成では、リクエストされた URL パスがそのまま S3 のキーとして使われます。

```
リクエスト: /posts/my-article
S3キー検索: posts/my-article    ← 存在しない！
実際のキー: posts/my-article.html  ← こっちはある
```

S3 の静的ウェブサイトホスティングを使えば `index.html` の自動解決ができますが、OAC（Origin Access Control）とは併用できません。OAC を使う場合、S3 は REST API としてアクセスされるため、キーの完全一致が求められます。

**つまり、URLとS3キーがズレているのが原因でした。**

## どうやって解決したんだ

2 つの変更を組み合わせました。

### 1. trailingSlash: true を有効にする

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
};
```

これにより、出力構造が変わります。

```
out/
├── index.html
├── about/
│   └── index.html
├── posts/
│   └── my-article/
│       └── index.html
└── tags/
    └── Next.js/
        └── index.html
```

各ページが `ディレクトリ/index.html` として出力されるようになりました。

### 2. CloudFront Function でURLをリライトする

S3 にリクエストが届く前に、URL の末尾に `/index.html` を付けます。

```javascript
function handler(event) {
  var uri = event.request.uri;
  if (uri.endsWith('/')) {
    // /posts/my-article/ → /posts/my-article/index.html
    event.request.uri = uri + 'index.html';
  } else if (!uri.includes('.')) {
    // /posts/my-article → /posts/my-article/index.html
    event.request.uri = uri + '/index.html';
  }
  return event.request;
}
```

`trailingSlash: true` と組み合わせることで、`/tags/Next.js/` のようなドット入り URL でも `uri.endsWith('/')` で正しくマッチします。`.` の有無ではなく `/` の有無で判定するので、タグ名にどんな文字が含まれていても安全です。

### Terraform に追加

CloudFront Function は Terraform で以下のように定義しました。

```hcl
resource "aws_cloudfront_function" "url_rewrite" {
  name    = "${var.function_name_prefix}-url-rewrite"
  runtime = "cloudfront-js-2.0"
  publish = true
  code    = <<-EOT
    function handler(event) {
      var uri = event.request.uri;
      if (uri.endsWith('/')) {
        event.request.uri = uri + 'index.html';
      } else if (!uri.includes('.')) {
        event.request.uri = uri + '/index.html';
      }
      return event.request;
    }
  EOT
}
```

`default_cache_behavior` に `function_association` を追加して紐付けます。

```hcl
default_cache_behavior {
  # ...省略...

  function_association {
    event_type   = "viewer-request"
    function_arn = aws_cloudfront_function.url_rewrite.arn
  }
}
```

## まとめ

Next.js + CloudFront + S3 の構成は定番ですが、OAC を使う場合は URL リライトがほぼ必須です。
全然知らなかったのですが、割と常識らしいです。

勉強不足を痛感しますね。

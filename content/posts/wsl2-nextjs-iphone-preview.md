---
title: "Wi-FiなしのWSL2環境でNext.jsの開発サーバーをiPhoneで確認する"
date: "2026-04-20"
tags: ["Next.js", "WSL", "Windows", "Network"]
description: このブログを構築する際、スマホで開発サーバにアクセスするときにハマった話です。
---

&nbsp;

ブログを見せつけたいときにいつも PC があるとは限りません。スマホならそこら辺安心です。じゃあスマホでレイアウトを確認したい。

そうです。このブログを構築しているときに思っていたことです。Chrome DevTools も活用していましたが、限界があり。

スマートフォンと同じ Wi-Fi に繋がった PC なら `--hostname 0.0.0.0` をつけて起動するだけでアクセス可能のようです。

しかし有線 LAN しかない PC に WSL2 で開発環境を構築していると、思いのほか手間がかかりました。その記録を残しておきます。

## 環境

- Windows 11
- WSL2
- 有線 LAN 接続（Wi-Fi アダプタなし）
- iPhone（Wi-Fi ルーター経由で同一ネットワーク）
- Safari（iPhone から確認したいブラウザ）
- Next.js (App Router)

ネットワーク構成はこうなっています。

```
インターネット
    ↓
マンションの共用回線
    ↓
スイッチングハブ
    ├── PC（有線）
    └── Wi-Fiルーター
            └── iPhone（Wi-Fi）
```

PC と iPhone は同じスイッチングハブ配下にいますので、一応同一ネットワークです。

（この構成って割とあるあるだと思うのですがそうでもないのでしょうか。同じ壁にぶつかっている人があまり見当たりませんでした）

## ステップ1: Next.jsを外部からアクセスできるようにする

まず WSL 上で開発サーバーを起動するとき、`--hostname 0.0.0.0` を指定します。デフォルトのままだと `localhost` のみでリッスンするため、外部からアクセスできません。

```bash
npx next dev --hostname 0.0.0.0 --port 3000
```

## ステップ2: ポートフォワーディングを設定する

WSL2 は Windows ホストとネットワークが分離されています。そのため Windows のポートへのアクセスを WSL2 に転送する設定が必要になります。

PowerShell を管理者権限で開き、以下を実行します。

### WSL2のIPアドレスを確認する

```powershell
wsl hostname -I
```

### ポートフォワーディングを設定する

```powershell
netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=3000 connectaddress=<WSL2のIP>
```

### ファイアウォールを開ける

```powershell
New-NetFirewallRule `
  -DisplayName "WSL2 Next.js" `
  -Direction Inbound `
  -LocalPort 3000 `
  -Protocol TCP `
  -Action Allow `
  -RemoteAddress <iPhoneのIP>
```

### 設定を確認する

```powershell
netsh interface portproxy show all
```

以下のように表示されれば成功です。

```
ipv4 をリッスンする:         ipv4 に接続する:

Address         Port        Address         Port
--------------- ----------  --------------- ----------
0.0.0.0         3000        <WSL2のIP>      3000
```

### WindowsのIPを確認する

```powershell
ipconfig
```

「イーサネット」アダプタの IPv4 アドレスを確認します。これが iPhone からアクセスする先になります。

## ステップ3: iPhoneから確認できるか試す

iPhone の Safari で `http://<WindowsのIP>:3000` を開きます。

ページは表示されました。しかしここで新たな問題が発生しました。

---

## 【は？】JSが動かない

ページは表示されますが、`onClick` などのインタラクションが一切反応しません。

### 原因（AIによる推測）

AI に聞いたところ、以下のような推測でした。

Next.js 12 以降、HMR（Hot Module Replacement）は WebSocket 接続を使って動作しています。

> Previously, Next.js used a server-sent events connection to receive HMR events. Next.js 12 now uses a WebSocket connection.
>
> — [Next.js Docs, Upgrading to version 12](https://nextjs.org/docs/pages/guides/upgrading/version-12)

問題はこの WebSocket 接続先が `localhost` にハードコードされていることです。iPhone から Windows の IP でアクセスしても、ブラウザは `ws://localhost:3000/_next/webpack-hmr` に接続しようとします。iPhone にとっての `localhost` は iPhone 自身なので、当然接続は失敗します。

WebSocket 接続の失敗により webpack の HMR ランタイムが正常に完了せず、React の hydration が行われない状態になる。HTML は表示されるが、イベントハンドラが DOM に紐付かないため `onClick` などが一切反応しない。

なお `<Link>` は反応したのですが、SSR で出力された `<a>` タグとして動作しているためで、SPA 遷移ではなくフルページリロードが発生しているだけ、とのことでした。

真相はわかりません。

### 解決策: 静的ファイルをサーブする

`npm run dev` ではなく、ビルドした静的ファイルをサーブすることで解決できました。

いちいち打ってらんないので `package.json` に以下のスクリプトを追加して運用しています。

```json
"preview": "next build && npx serve out -l 3001"
```

`next build` で `out/` ディレクトリに静的ファイルを生成し、`npx serve` でそれをサーブします。こちらには HMR の仕組みが存在しないため、WebSocket の問題が発生しません。

3001 番ポートを使いたいので、またまたポートフォワーディングとファイアウォールの設定も追加します。

```powershell
netsh interface portproxy add v4tov4 listenport=3001 listenaddress=0.0.0.0 connectport=3001 connectaddress=<WSL2のIP>
New-NetFirewallRule `
  -DisplayName "WSL2 Next.js 3001" `
  -Direction Inbound `
  -LocalPort 3001 `
  -Protocol TCP `
  -Action Allow `
  -RemoteAddress <iPhoneのIP>
```

iPhone の Safari で `http://<WindowsのIP>:3001` を開くと、JS も含めて正常に動作しました。

ただ・・・コードを変更するたびに `next build` が走るため、リアルタイムのホットリロードはできません。

デザインの細かい調整には少し手間がかかりますが、スマホでの最終確認には十分使えます。

## 後片付け

開発が終わったらポートフォワーディングとファイアウォールルールを削除しておきます。

```powershell
netsh interface portproxy delete v4tov4 listenport=3000 listenaddress=0.0.0.0
netsh interface portproxy delete v4tov4 listenport=3001 listenaddress=0.0.0.0
Remove-NetFirewallRule -DisplayName "WSL2 Next.js"
Remove-NetFirewallRule -DisplayName "WSL2 Next.js 3001"
```

## まとめ

| 状況 | 対応 |
|---|---|
| PCがWi-Fi接続の場合 | `--hostname 0.0.0.0` だけで済む |
| PCが有線のみ（WSL2）の場合 | ポートフォワーディングが必要 |
| `npm run dev` でJSが効かない | `npx serve out` で静的ファイルをサーブする |

レスポンシブデザインって大変。

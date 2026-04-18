---
title: git commit --fixupいちいちCLIで打つの面倒やな・・・せや！
date: 2026-03-31
tags: [Git, VSCode]
description: fixup commit を GUI でやりたすぎて VSCode 拡張を作った話です。
---

&nbsp;

VSCode の拡張機能作って GUI で全部済むようにしたろ^^

&nbsp;

この記事は Zenn でも公開しています。

https://zenn.dev/netakiryosuke/articles/551a48b43f0f96

## はじめに

みなさん、`git commit --fixup` 使っていますか？

過去のコミットに対する修正を楽にまとめられる、地味ながら強力なコマンドです。ただ、ひとつ困っていることがありました。

私は Git 操作は GUI 派なので、ステージングもコミットもマウスカーソルで行います。

でも fixup のコミットは GUI でできないので、いつも

> あ～ fixup コミット積みたいから git commit --fixu... あ、コミットハッシュわからんわ、git log...
> いや、GUI のコミットツリーからとってきた方が早いかな・・・いやもうコマンド打っちゃったしいいや

みたいなことをしています。不毛‼️

で結局 fixup に満足して rebase を忘れたり・・・

&nbsp;

これは私が悪いのではなく GUI でできないのが悪い‼️と他責を発動し、ないなら作ればいいの精神で VSCode の拡張機能を作ることにしました。

## そもそも git commit --fixup とは？

この記事では詳しく説明しません。以下の記事が非常にわかりやすかったです。

https://zenn.dev/hrbrain/articles/4b0da97d8862b7

要は、**昔のコミットで修正漏れがあったから今追加したい^^ やりなおし？嫌や!!** みたいなときに便利なコミットです。

上の記事内にも登場しますが、`git rebase --autosquash` と組み合わせることで本領を発揮します。

## 私がほしかったもの

要件を整理すると、こういうことです。

- ソースコードを書き終えたら、キーボードとは絶交。一切触れずにステージング → fixup コミットまで完結させたい
- fixup コミットの対象を、コミットハッシュを調べることなく GUI で選びたい
- rebase を忘れないようにしたい（できればコミット直後に促してほしい）
- rebase も GUI でワンクリックで済ませたい

つまり、**fixup コミット → autosquash rebase までのフローを、CLI を一切開かずに完結させる** というのがゴールです。

## 作ったもの

**Git Fixup Panel** という VSCode 拡張を作りました。

https://marketplace.visualstudio.com/items?itemName=netakiryosuke.vscode-git-fixup-panel

インストールすると、いつもコミットするところに 2 つアイコンが登場します。

左が fixup で、右が rebase --autosquash です。

![VSCodeのソース管理タブの画像](/images/posts/vscode-git-fixup-extension/image1.png)

↓ なんとなんと、fixup がキーボードに触れずにできているではありませんか！

![fixupをGUIで行っているGIF](/images/posts/vscode-git-fixup-extension/gif1.gif)

↓ rebase --autosquash も。ベースのコミットも視覚的に選べます

![rebaseをGUIで行っているGIF](/images/posts/vscode-git-fixup-extension/gif2.gif)

## 作ってみての感想

拡張機能って割とハードル高いかなって思っていたのですが、AI の力を使えば割と簡単にできました。TypeScript（JavaScript）がサポートされていますが、普段バックエンドを書いている方ならスッと入ってくると思います。

MarketPlace に出すのが少し面倒だったぐらいです。それも先人たちがやり方を残してくれていますし、一度ワークフローを作ってしまえば後は機能の改善に集中できました。

## おわりに

CLI を開くことなく fixup コミットから rebase まで完結するようになって、だいぶ快適になりました。GUI は人生‼️

同じ不満を抱えていた方の参考になれば幸いです^^

リポジトリはこちら↓

https://github.com/netakiryosuke/vscode-git-fixup-panel

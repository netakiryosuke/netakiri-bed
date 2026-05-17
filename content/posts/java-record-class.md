---
title: Recordのアクセサはなぜ getName() ではなく name() なのか
date: 2026-05-17
tags: [Java]
description: クラスと異なるアクセサ名にする必要あったのか？がちょっと気になりました。
---


Java の Record はなぜ `getName()` ではなく `name()` なのか。
クラスと揃えれば移行が楽では？

Java の Record を使っていたとき、ふと疑問に思いましたので調べてみました。

```java
class Person {
    private String name;
    private int age;
    
    // （略）コンストラクタ

    public String getName() {
        return name;
    }

    // ・・・
}

Person person = new Person("太郎", 25);

System.out.println(person.getName()); // 太郎
```

```java
record Person(String name, int age) {}

Person person = new Person("太郎", 25);

System.out.println(person.name()); // 太郎
// ↑ なんで getName() じゃないの?
```

もちろんたまたまではなく、調べてみると、これはJava設計者の**意図的な選択**であり、いくつかの重要な思想が背景にありました。

## Record とクラスはそもそもコンセプトが違う

まず前提として、Record は「ボイラープレートを減らすためのクラス」（＝従来のクラスの書き方を単に簡略化したもの）ではありません。

JEP 395（Java 16 で Record を正式導入した JEP）には、設計目標がこう書かれています。

> _While it is superficially tempting to treat records as primarily being about boilerplate reduction, we instead choose a more semantic goal: modeling data as data._

（訳）ボイラープレート削減が主目的ではなく、**「データをデータとして表現する」**という意味論的なゴールを選んだのだ。

&nbsp;

その定義として、Record は JEP 395 の冒頭でこう位置づけられています。

> _transparent carriers for immutable data_

（訳）「イミュータブルなデータの透明な入れ物」

&nbsp;

ここで **transparent（透明）** という言葉が重要で、Recordはその内部状態を隠蔽しません。フィールド自体は `private final` ですが、コンポーネントごとにアクセサメソッドが自動生成され、状態の記述がそのまま API になるのです。

一方で通常のクラス（JavaBeans）は、フィールドを `private` で隠してアクセサ経由で外部に公開するという**カプセル化**を基本とします。・・・勘がよければそろそろわかってきましたね。

&nbsp;

通常クラスのアクセサである `getName()` の `get` という動詞には、**「内部に隠されたものを取り出す操作」** が表れているのです。

Record にはそもそも隠すものがない。だからアクセサは「操作」ではなく、**「コンポーネントそのもの」の射影**として、フィールド名だけで表現されている、ということです。

・・・あ～、まあ言われてみれば、納得。


## Brian Goetz 本人の発言

`get`をつけなかった判断について、Java の Record 設計を主導した Brian Goetz は2020年の OpenJDK メーリングリスト（[amber-dev, 2020-08-05](https://mail.openjdk.org/pipermail/amber-dev/2020-August/006414.html)）でこう説明しています。

> _Taking a bad library naming convention and burning it into the language forever would have been the worse choice._

（訳）悪いライブラリの命名規則を永遠に言語に焼き付けるより、そうしないほうがよかった。

&nbsp;

さらに設計の優先順位についても明言しています。

> _We made the deliberate choice to design the feature for new code than for catering to the quirks of existing code._

（訳）既存コードの奇癖に合わせるより、**新しいコードのために設計することを意図的に選んだ**。

&nbsp;

また、同じメールには `getX` と `isX` 問題への言及もあります。JavaBeansの命名規則では `boolean` は `isX()`、それ以外は `getX()` という慣習があるが、これは標準ではなく慣習であるため、エコシステム全体で一貫して適用されていない。Recordに `get` を採用しても「完全に互換」にはなれない、と指摘しています。

さらに遡ると、2019年以前の設計ドキュメントにも同様の意思が見られます（[inspired by actual events, 2018](http://marxsoftware.blogspot.com/2018/04/updates-on-records-data-classes-for-java.html)）。

> _These will not be named getXxx; we are not burning the ill-advised JavaBean naming conventions into the language, no matter how much people think it already is._

（訳）ill-advised（良くない考えの）JavaBean命名規則を言語に焼き付けることはしない。


## 移行コストについて

ちょっと待ってください。んなこといっても既存の JavaBeans 的クラスと Record 間の移行は大変じゃないか！

そこはどうしようもないの？

実際、Goetz はメーリングリストでこのトレードオフを認めています。

> _new code will pay less tax than old code, but its not the case you can't migrate to records and get some benefit._

（訳）新しいコードのほうが恩恵を受けやすいが、既存コードでも移行して利益を得ることはできる。

&nbsp;

ただし「フレームワーク依存のコード」（JPA、Jackson 等）を移行する場合は、フレームワーク側の対応が必要になる。これについて Goetz は、フレームワークは Record に対応するはずだ（実際 Spring 等は Record に対応していますね？）とし、移行コストは**一時的なもの**と位置づけています。


## まとめ

| | 通常クラス（JavaBeans） | Record |
|---|---|---|
| 設計思想 | カプセル化・状態の隠蔽 | 透明なデータキャリア |
| フィールド | `private` がキホン | 自動的に`private final` |
| アクセサ命名 | `getName()` | `name()` |
| ミュータビリティ | 可変 | イミュータブル |
| 用途 | 振る舞いを持つオブジェクト | 値の集合体（DTO等） |

`name()` という命名は、「Record はデータを隠さない」という設計思想の表れであり、`getX` という命名規則を言語仕様に取り込まない意図的な決断だったんですね。既存コードとの互換性よりも **「新しいコードのために正しい設計をする」** ことを優先した結果ともいえるでしょうか。

Record は JavaBeans の代替ではなく、**別の概念**であることは肝に銘じておくことにします。

移行の際に摩擦が生じるとすれば、それは Record が既存の慣習と意図的に一線を画しているためであり、その摩擦こそが「Record は JavaBeans ではない」ということを強く表していますね。


## 参考

- [JEP 395: Records](https://openjdk.org/jeps/395)（Java 16、正式導入）
- [Brian Goetz — amber-dev mailing list, 2020-08-05](https://mail.openjdk.org/pipermail/amber-dev/2020-August/006414.html)（アクセサ命名の議論）
- [JLS 8.10 Record Classes](https://docs.oracle.com/javase/specs/jls/se16/html/jls-8.html#jls-8.10)

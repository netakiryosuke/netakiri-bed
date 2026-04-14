---
title: テックブログをNext.jsで作った話
date: 2026-04-14
tags: [Next.js, TypeScript, Markdown]
description: Next.js App RouterとMarkdownでテックブログを構築した際の設計・実装メモです。
---

## はじめに

このブログは Next.js App Router + `output: 'export'` で構築しています。
記事は Markdown で管理し、GitHub のブランチ運用で公開/非公開を切り替えています。

## 技術スタック

| 項目 | 採用技術 |
|------|---------|
| フレームワーク | Next.js (App Router) |
| スタイリング | Tailwind CSS |
| Markdown変換 | remark / rehype / Shiki |
| ホスティング | CloudFront + S3 |

## コードサンプル

```typescript
export async function getPostBySlug(slug: string): Promise<Post> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  const fileContent = await fs.promises.readFile(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const { contentHtml, toc } = await markdownToHtml(content);
  return { slug, ...parseFrontmatter(data, slug), contentHtml, toc };
}
```

## まとめ

シンプルな構成でも十分なテックブログが作れます。
デザインは **Tailwind CSS** で自分好みにカスタマイズできます。

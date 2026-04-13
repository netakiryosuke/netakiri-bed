import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import type { Root } from "hast";
import type { Plugin } from "unified";
import type { TocItem } from "@/types/post";

interface MarkdownResult {
  contentHtml: string;
  toc: TocItem[];
}

function rehypeExtractToc(toc: TocItem[]): Plugin<[], Root> {
  return () => (tree) => {
    tree.children.forEach((node) => {
      if (node.type !== "element") return;
      const match = node.tagName.match(/^h([2-4])$/);
      if (!match) return;

      const level = parseInt(match[1], 10);
      const id = typeof node.properties?.id === "string" ? node.properties.id : "";
      const text = node.children
        .filter((c) => c.type === "text")
        .map((c) => ("value" in c ? c.value : ""))
        .join("");

      if (id && text) {
        toc.push({ id, text, level });
      }
    });
  };
}

export async function markdownToHtml(markdown: string): Promise<MarkdownResult> {
  const toc: TocItem[] = [];

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeExtractToc(toc))
    .use(rehypeShiki, { theme: "github-dark" })
    .use(rehypeStringify)
    .process(markdown);

  return { contentHtml: result.toString(), toc };
}

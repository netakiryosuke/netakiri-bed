import fs from "fs";
import path from "path";
import { cache } from "react";
import { markdownToHtml } from "@/lib/markdown";
import type { TocItem } from "@/types/post";

const ABOUT_PATH = path.join(process.cwd(), "content/about/about.md");

interface AboutContent {
  contentHtml: string;
  toc: TocItem[];
}

export const getAboutContent = cache(async (): Promise<AboutContent> => {
  const markdown = await fs.promises.readFile(ABOUT_PATH, "utf8");
  return markdownToHtml(markdown);
});

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
   try {
     await fs.promises.access(ABOUT_PATH, fs.constants.F_OK);
   } catch {
     throw new Error(`About content file not found: ${ABOUT_PATH}`);
   }
   
  const markdown = await fs.promises.readFile(ABOUT_PATH, "utf8");
  return markdownToHtml(markdown);
});

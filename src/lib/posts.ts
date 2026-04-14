import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";
import { markdownToHtml } from "@/lib/markdown";
import type { Post, PostFrontmatter, PostSummary } from "@/types/post";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

function parseFrontmatter(data: Record<string, unknown>, slug: string): PostFrontmatter {
  if (typeof data.title !== "string" || !data.title) {
    throw new Error(`Missing required frontmatter field "title" in post "${slug}"`);
  }

  const date =
    data.date instanceof Date
      ? data.date.toISOString().split("T")[0]
      : typeof data.date === "string"
        ? data.date
        : null;
  if (!date) {
    throw new Error(`Missing required frontmatter field "date" in post "${slug}"`);
  }

  return {
    title: data.title,
    date,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    description: typeof data.description === "string" ? data.description : undefined,
  };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(getSlugFromFilename);
}

export const getAllPosts = cache((): PostSummary[] => {
  const slugs = getAllPostSlugs();
  return slugs
    .map((slug) => {
      const filePath = path.join(POSTS_DIR, `${slug}.md`);
      const { data } = matter(fs.readFileSync(filePath, "utf8"));
      return { slug, ...parseFrontmatter(data, slug) };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
});

export function getPostsByTag(tag: string): PostSummary[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getAllTags(): string[] {
  const tags = getAllPosts().flatMap((post) => post.tags);
  return [...new Set(tags)].sort();
}

export const getPostBySlug = cache(async (slug: string): Promise<Post> => {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  try {
    await fs.promises.access(filePath);
  } catch {
    throw new Error(`Post not found: "${slug}" (expected at ${filePath})`);
  }
  const fileContent = await fs.promises.readFile(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const { contentHtml, toc } = await markdownToHtml(content);

  return {
    slug,
    ...parseFrontmatter(data, slug),
    contentHtml,
    toc,
  };
});

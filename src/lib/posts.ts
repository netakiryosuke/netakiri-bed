import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { markdownToHtml } from "@/lib/markdown";
import type { Post, PostFrontmatter, PostSummary } from "@/types/post";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

function parseFrontmatter(data: Record<string, unknown>): PostFrontmatter {
  return {
    title: typeof data.title === "string" ? data.title : "",
    date: data.date instanceof Date
      ? data.date.toISOString().split("T")[0]
      : typeof data.date === "string" ? data.date : "",
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

export function getAllPosts(): PostSummary[] {
  const slugs = getAllPostSlugs();
  return slugs
    .map((slug) => {
      const filePath = path.join(POSTS_DIR, `${slug}.md`);
      const { data } = matter(fs.readFileSync(filePath, "utf8"));
      return { slug, ...parseFrontmatter(data) };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByTag(tag: string): PostSummary[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getAllTags(): string[] {
  const tags = getAllPosts().flatMap((post) => post.tags);
  return [...new Set(tags)].sort();
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: "${slug}" (expected at ${filePath})`);
  }
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const { contentHtml, toc } = await markdownToHtml(content);

  return {
    slug,
    ...parseFrontmatter(data),
    contentHtml,
    toc,
  };
}

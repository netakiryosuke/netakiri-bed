import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { absoluteUrl, postPath, tagPath } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    {
      url: absoluteUrl(),
      lastModified: posts[0]?.date,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about/"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...posts.map((post) => ({
      url: absoluteUrl(postPath(post.slug)),
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getAllTags().map((tag) => ({
      url: absoluteUrl(tagPath(tag)),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}

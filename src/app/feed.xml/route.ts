import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, postPath, siteConfig, tagPath } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toRfc822Date(date: string): string {
  return new Date(`${date}T00:00:00.000Z`).toUTCString();
}

export function GET(): Response {
  const items = getAllPosts()
    .map((post) => {
      const url = absoluteUrl(postPath(post.slug));
      const categories = post.tags
        .map((tag) => `      <category domain="${escapeXml(absoluteUrl(tagPath(tag)))}">${escapeXml(tag)}</category>`)
        .join("\n");

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.description ?? "")}</description>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${toRfc822Date(post.date)}</pubDate>
${categories}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <description>${escapeXml(siteConfig.description)}</description>
    <link>${escapeXml(absoluteUrl())}</link>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

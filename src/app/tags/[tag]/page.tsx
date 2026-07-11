import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { absoluteUrl, siteConfig, tagPath } from "@/lib/site";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  // Next.js が内部で encodeURIComponent を適用するため、生の値を返す
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const description = `寝たきり｜Late Nightの「${tag}」に関する記事一覧です。`;
  const url = absoluteUrl(tagPath(tag));

  return {
    title: `タグ: ${tag}`,
    description,
    alternates: {
      canonical: tagPath(tag),
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      title: `タグ: ${tag} | ${siteConfig.name}`,
      description,
    },
    twitter: {
      card: "summary",
      title: `タグ: ${tag} | ${siteConfig.name}`,
      description,
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <main>
      <section className="relative z-10 p-10 min-h-screen bg-white/3 backdrop-blur-sm">
        <h1 className="text-white">{tag}</h1>
        <p className="text-gray-400 mb-6">{posts.length}件の記事</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

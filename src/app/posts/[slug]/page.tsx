import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import Toc from "@/components/Toc";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // TODO(#issue): frontmatter不備やMarkdown変換エラーも握りつぶすため、NotFound専用エラー型の導入を検討
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  // TODO(#issue): frontmatter不備やMarkdown変換エラーも握りつぶすため、NotFound専用エラー型の導入を検討
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  return (
    <main>
      <article>
        <header>
          <h1 className="text-white">{post.title}</h1>
          <time dateTime={post.date} className="text-white">{post.date}</time>
          {post.tags.length > 0 && (
            <ul>
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Link href={`/tags/${encodeURIComponent(tag)}`} className="text-white">{tag}</Link>
                </li>
              ))}
            </ul>
          )}
        </header>
        <div className="flex gap-8">
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} className="text-white" />
          <aside className="sticky top-24 self-start">
            <Toc items={post.toc} />
          </aside>
        </div>
      </article>
    </main>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import Toc from "@/components/Toc";
import styles from "./content.module.css";
import Tag from "@/components/Tag";

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
      <article className="text-white p-10">
        <header className="p-8 border-2 border-zinc-700 rounded bg-white/3 backdrop-blur-sm">
          <h1>{post.title}</h1>
          <time dateTime={post.date}>{post.date}</time>
          {post.tags.length > 0 && (
            <ul className="flex flex-row flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Tag tagName={tag} />
                </li>
              ))}
            </ul>
          )}
        </header>
        <div className="flex gap-8 py-10">
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} className={`p-8 pt-0 border-2 border-zinc-700 rounded flex-[3] bg-white/3 backdrop-blur-sm ${styles.content}`} />
          <aside className="
            sticky
            top-24
            self-start
            border border-transparent
            rounded
            flex-[1]
            text-black
            bg-white/50 backdrop-blur
          ">
            <Toc items={post.toc}/>
          </aside>
        </div>
      </article>
    </main>
  );
}

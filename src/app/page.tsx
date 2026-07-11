import Tag from "@/components/Tag";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main>
      <section className="fixed top-0 left-0 w-full h-[100lvh] flex flex-col items-center justify-center z-0">
        <h1 className="flex gap-2 text-white text-4xl font-normal tracking-normal items-baseline">
          <span className="font-jp text-3xl">寝たきり</span>
          <span aria-hidden="true" className="opacity-50">|</span>
          <span className="font-en tracking-wide">Late Night</span>
        </h1>
        <p className="text-base text-gray-300 pt-2">ベッドで読み返せるような、そんな深夜のメモ</p>
      </section>

      <section className="relative z-10 p-10 mt-[100lvh] min-h-screen bg-white/3 backdrop-blur-sm">
        <h2 className="text-white">記事一覧</h2>
        <div className="mt-8 max-w-5xl text-white">
          {posts[0] && (
            <article className="grid gap-3 border-y border-white/30 py-6 md:grid-cols-[7rem_minmax(0,1fr)_auto] md:items-end md:gap-6">
              <div className="text-xs tracking-[0.16em] text-white/60">
                <p className="font-en">LATEST</p>
                <time dateTime={posts[0].date}>{posts[0].date}</time>
              </div>
              <div>
                <h3 className="text-xl font-normal leading-snug md:text-2xl">
                  <Link className="transition-opacity hover:opacity-70 focus-visible:opacity-70" href={`/posts/${posts[0].slug}`}>
                    {posts[0].title}
                  </Link>
                </h3>
                {posts[0].description && <p className="mt-2 text-sm text-white/65">{posts[0].description}</p>}
              </div>
              {posts[0].tags.length > 0 && (
                <ul className="flex flex-wrap gap-2 md:justify-end">
                  {posts[0].tags.map((tag) => <li key={tag}><Tag tagName={tag} /></li>)}
                </ul>
              )}
            </article>
          )}
          <ul aria-label="その他の記事">
            {posts.slice(1).map((post) => (
              <li key={post.slug} className="grid gap-3 border-b border-white/15 py-5 md:grid-cols-[7rem_minmax(0,1fr)_auto] md:items-center md:gap-6">
                <time className="text-xs tracking-[0.08em] text-white/60" dateTime={post.date}>{post.date}</time>
                <h3 className="text-base font-normal leading-snug md:text-lg">
                  <Link className="transition-opacity hover:opacity-70 focus-visible:opacity-70" href={`/posts/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                {post.tags.length > 0 && (
                  <ul className="flex flex-wrap gap-2 md:justify-end">
                    {post.tags.map((tag) => <li key={tag}><Tag tagName={tag} /></li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

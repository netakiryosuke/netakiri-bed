import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import HomeHero from "./HomeHero";
import styles from "./HomeMotion.module.css";

function TagLinks({ tags }: { tags: string[] }) {
  return (
    <ul className={`font-en flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] text-white/70 sm:col-start-2 sm:justify-start lg:col-auto lg:justify-end ${styles.tagLinks}`}>
      {tags.map((tag) => (
        <li key={tag}>
          <Link className="underline decoration-white/40 underline-offset-4 hover:decoration-white/80 focus-visible:decoration-white/80" href={`/tags/${encodeURIComponent(tag)}`}>
            #{tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const posts = getAllPosts();
  const postCount = String(posts.length).padStart(2, "0");

  return (
    <main>
      <HomeHero />

      <section id="article-index" className={`relative z-10 mt-[100lvh] bg-white/3 px-6 py-14 backdrop-blur-sm sm:px-10 sm:py-16 ${styles.indexReveal}`}>
        <div className="w-full">
          <div className="border-b border-white/35 pb-5 sm:flex sm:items-end sm:justify-between">
            <div>
              <p className="font-en mb-2 text-xs tracking-[0.18em] text-white/60">ARCHIVE</p>
              <h2 className="font-jp mb-0 text-white">記事一覧</h2>
            </div>
            <p className="font-en mb-0 mt-4 text-xs tracking-[0.14em] text-white/55 sm:mt-0">{postCount} NOTES</p>
          </div>
          <div className="mt-8 text-white sm:mt-10">
          {posts[0] && (
            <article className="grid gap-4 border-b border-white/35 py-7 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-end sm:gap-x-8 lg:grid-cols-[9rem_minmax(0,52rem)_minmax(12rem,1fr)]">
              <div className="font-en text-xs tracking-[0.14em] text-white/60">
                <p className="font-en mb-1 leading-none">LATEST</p>
                <time dateTime={posts[0].date}>{posts[0].date}</time>
              </div>
              <div>
                <h3 className="font-jp mb-0 text-xl font-normal leading-snug md:text-2xl">
                  <Link className="group inline-flex items-baseline gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" href={`/posts/${posts[0].slug}`}>
                    {posts[0].title}
                    <span aria-hidden="true" className="translate-x-[-0.25rem] text-sm opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-80 group-focus-visible:translate-x-0 group-focus-visible:opacity-80">↗</span>
                  </Link>
                </h3>
                {posts[0].description && <p className="font-jp mb-0 mt-2 max-w-2xl text-sm leading-7 text-white/65">{posts[0].description}</p>}
              </div>
              {posts[0].tags.length > 0 && <TagLinks tags={posts[0].tags} />}
            </article>
          )}
          <ul aria-label="その他の記事">
            {posts.slice(1).map((post) => (
              <li key={post.slug} className={`grid gap-3 border-b border-white/15 py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-start sm:gap-x-8 lg:grid-cols-[9rem_minmax(0,52rem)_minmax(12rem,1fr)] ${styles.archiveEntry}`}>
                <time className="font-en text-xs tracking-[0.08em] text-white/60" dateTime={post.date}>{post.date}</time>
                <div>
                  <h3 className="font-jp mb-0 text-base font-normal leading-snug md:text-lg">
                    <Link className={`group inline-flex items-baseline gap-2 focus-visible:outline-none ${styles.stretchedLink}`} href={`/posts/${post.slug}`}>
                      {post.title}
                      <span aria-hidden="true" className="translate-x-[-0.25rem] text-xs opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-80 group-focus-visible:translate-x-0 group-focus-visible:opacity-80">↗</span>
                    </Link>
                  </h3>
                  {post.description && (
                    <div className={styles.postSummary}>
                      <div>
                        <p className={`font-jp mb-0 mt-3 text-sm leading-7 text-white/65 ${styles.postSummaryText}`}>{post.description}</p>
                      </div>
                    </div>
                  )}
                </div>
                {post.tags.length > 0 && <TagLinks tags={post.tags} />}
              </li>
            ))}
          </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

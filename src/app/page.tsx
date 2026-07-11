import { getAllPosts, getAllTags } from "@/lib/posts";
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
  const topics = getAllTags().map((tag) => ({
    tag,
    count: posts.filter((post) => post.tags.includes(tag)).length,
  })).sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "ja"));

  return (
    <main>
      <HomeHero />

      <section id="article-index" className={`relative z-10 mt-[100lvh] bg-white/3 px-6 py-14 backdrop-blur-sm sm:px-10 sm:py-16 ${styles.indexReveal}`}>
        <div className="w-full">
          <div className={`border-b border-white/35 pb-5 sm:flex sm:items-end sm:justify-between ${styles.archiveHeader}`}>
            <div className={styles.archiveHeading}>
              <p className="font-en mb-2 text-xs tracking-[0.18em] text-white/60">ARCHIVE</p>
              <h2 className="font-jp mb-0 text-white">記事一覧</h2>
            </div>
            <p className={`font-en mb-0 mt-4 text-xs tracking-[0.14em] text-white/55 sm:mt-0 ${styles.archiveCount}`}>{postCount} NOTES</p>
          </div>
          <div className={`mt-8 text-white sm:mt-10 ${styles.archiveList}`}>
          {posts[0] && (
            <article className={`grid gap-4 border-b border-white/35 px-[clamp(0.75rem,2vw,1.25rem)] py-7 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-end sm:gap-x-8 lg:grid-cols-[9rem_minmax(0,52rem)_minmax(12rem,1fr)] ${styles.archiveEntry}`}>
              <Link className={`group grid gap-4 sm:col-span-2 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-x-8 lg:col-span-2 ${styles.articleLink}`} href={`/posts/${posts[0].slug}`}>
                <div className="font-en text-xs tracking-[0.14em] text-white/60">
                  <p className="font-en mb-1 leading-none">LATEST</p>
                  <time dateTime={posts[0].date}>{posts[0].date}</time>
                </div>
                <div>
                  <h3 className="font-jp mb-0 text-xl font-normal leading-snug md:text-2xl">
                    {posts[0].title}
                    <span aria-hidden="true" className="ml-2 inline-block translate-x-[-0.25rem] text-sm opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-80 group-focus-visible:translate-x-0 group-focus-visible:opacity-80">↗</span>
                  </h3>
                  {posts[0].description && <p className="font-jp mb-0 mt-2 max-w-2xl text-sm leading-7 text-white/65">{posts[0].description}</p>}
                </div>
              </Link>
              {posts[0].tags.length > 0 && <TagLinks tags={posts[0].tags} />}
            </article>
          )}
          <ul aria-label="その他の記事">
            {posts.slice(1).map((post) => (
              <li key={post.slug} className={`grid gap-3 border-b border-white/15 px-[clamp(0.75rem,2vw,1.25rem)] py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-start sm:gap-x-8 lg:grid-cols-[9rem_minmax(0,52rem)_minmax(12rem,1fr)] ${styles.archiveEntry}`}>
                <Link className={`group grid gap-3 sm:col-span-2 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-x-8 lg:col-span-2 ${styles.articleLink}`} href={`/posts/${post.slug}`}>
                  <time className="font-en text-xs tracking-[0.08em] text-white/60" dateTime={post.date}>{post.date}</time>
                  <div>
                    <h3 className="font-jp mb-0 text-base font-normal leading-snug md:text-lg">
                      {post.title}
                      <span aria-hidden="true" className="ml-2 inline-block translate-x-[-0.25rem] text-xs opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-80 group-focus-visible:translate-x-0 group-focus-visible:opacity-80">↗</span>
                    </h3>
                  {post.description && (
                    <div className={styles.postSummary}>
                      <div>
                        <p className={`font-jp mb-0 mt-3 text-sm leading-7 text-white/65 ${styles.postSummaryText}`}>{post.description}</p>
                      </div>
                    </div>
                  )}
                  </div>
                </Link>
                {post.tags.length > 0 && <TagLinks tags={post.tags} />}
              </li>
            ))}
          </ul>
          </div>
          {topics.length > 0 && (
            <section className="mt-20 border-t border-white/25 pt-8 sm:mt-28 sm:grid sm:grid-cols-[minmax(12rem,0.5fr)_minmax(0,1fr)] sm:gap-x-12 sm:pt-10" aria-labelledby="topics-heading">
              <div>
                <p className="font-en mb-2 text-xs tracking-[0.18em] text-white/60">TOPICS</p>
                <h2 id="topics-heading" className="font-jp mb-0 text-xl font-normal text-white">タグから探す</h2>
              </div>
              <ul className="mt-8 grid border-t border-white/20 sm:mt-0 sm:grid-cols-2 sm:gap-x-8">
                {topics.map(({ tag, count }) => (
                  <li key={tag} className="border-b border-white/20">
                    <Link className="font-en flex items-baseline justify-between gap-4 py-4 text-base text-white/85 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" href={`/tags/${encodeURIComponent(tag)}`}>
                      <span>#{tag}</span>
                      <span className="text-xs tracking-[0.12em] text-white/55">{String(count).padStart(2, "0")} NOTES</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section className="mt-16 border-t border-white/25 pt-8 sm:mt-20 sm:grid sm:grid-cols-[minmax(12rem,0.5fr)_minmax(0,1fr)] sm:gap-x-12 sm:pt-10" aria-labelledby="about-home-heading">
            <div>
              <p className="font-en mb-2 text-xs tracking-[0.18em] text-white/60">ABOUT</p>
              <h2 id="about-home-heading" className="font-jp mb-0 text-xl font-normal text-white">書いている人</h2>
            </div>
            <div className="mt-8 max-w-2xl sm:mt-0">
              <p className="font-jp mb-4 text-sm leading-8 text-white/70">
                2025年に新卒でIT企業に入社したエンジニアです。Java / Spring Bootをメインに、AWSも触っています。設計やアーキテクチャまわりに興味があり、「なぜそう作るのか」を考えるのが好きです。
              </p>
              <Link className="font-en text-sm text-white/85 underline decoration-white/40 underline-offset-4 hover:decoration-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" href="/about">
                More about me →
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import type { PostSummary } from "@/types/post";
import HomeTagLinks from "@/components/HomeTagLinks";
import styles from "@/app/HomeMotion.module.css";

interface HomeArticleArchiveProps {
  posts: PostSummary[];
}

interface PostRowProps {
  post: PostSummary;
}

interface ArchivePostRowProps extends PostRowProps {
  index: number;
}

const LatestPostRow = ({ post }: PostRowProps) => (
  <article data-reveal-once="content-enter" className={`grid gap-4 border-b border-white/35 px-[clamp(0.75rem,2vw,1.25rem)] py-7 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-end sm:gap-x-8 lg:grid-cols-[9rem_minmax(0,52rem)_minmax(12rem,1fr)] ${styles.archiveEntry} ${styles.archiveRow} ${styles.latestRow}`}>
    <Link className={`group grid gap-4 sm:col-span-2 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-x-8 lg:col-span-2 ${styles.articleLink}`} href={`/posts/${post.slug}`}>
      <div className="font-en text-xs tracking-[0.14em] text-white/60">
        <p className="font-en mb-1 leading-none">LATEST</p>
        <time dateTime={post.date}>{post.date}</time>
      </div>
      <div>
        <h3 className="font-jp mb-0 text-xl font-normal leading-snug md:text-2xl">
          {post.title}
          <span aria-hidden="true" className="ml-2 inline-block translate-x-[-0.25rem] text-sm opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-80 group-focus-visible:translate-x-0 group-focus-visible:opacity-80">↗</span>
        </h3>
        {post.description && <p className="font-jp mb-0 mt-2 max-w-2xl text-sm leading-7 text-white/65">{post.description}</p>}
      </div>
    </Link>
    {post.tags.length > 0 && <HomeTagLinks tags={post.tags} />}
  </article>
);

const ArchivePostRow = ({ post, index }: ArchivePostRowProps) => (
  <li data-reveal-once="content-enter" className={`grid gap-3 border-b border-white/15 px-[clamp(0.75rem,2vw,1.25rem)] py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-start sm:gap-x-8 lg:grid-cols-[9rem_minmax(0,52rem)_minmax(12rem,1fr)] ${styles.archiveEntry} ${styles.archiveRow}`} style={{ animationDelay: `${Math.min(index * 40, 160)}ms` }}>
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
    {post.tags.length > 0 && <HomeTagLinks tags={post.tags} />}
  </li>
);

export default function HomeArticleArchive({ posts }: HomeArticleArchiveProps) {
  const postCount = String(posts.length).padStart(2, "0");
  const latestPost = posts[0];

  return (
    <>
      <div data-reveal-once="line-enter" className={`border-b border-white/35 pb-5 sm:flex sm:items-end sm:justify-between ${styles.archiveHeader}`}>
        <div data-reveal-once="archive-enter" className={styles.archiveHeading}>
          <p className="font-en mb-2 text-xs tracking-[0.18em] text-white/60">ARCHIVE</p>
          <h2 className="font-jp mb-0 text-white">記事一覧</h2>
        </div>
        <p data-reveal-once="archive-enter" className={`font-en mb-0 mt-4 text-xs tracking-[0.14em] text-white/55 sm:mt-0 ${styles.archiveCount}`}>{postCount} NOTES</p>
      </div>
      <div className={`mt-8 text-white sm:mt-10 ${styles.archiveList}`}>
        {latestPost && <LatestPostRow post={latestPost} />}
        <ul aria-label="その他の記事">
          {posts.slice(1).map((post, index) => (
            <ArchivePostRow key={post.slug} post={post} index={index} />
          ))}
        </ul>
      </div>
    </>
  );
}

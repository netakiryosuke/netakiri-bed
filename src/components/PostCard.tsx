import Link from "next/link";
import type { PostSummary } from "@/types/post";

interface Props {
  post: PostSummary;
}

export default function PostCard({ post }: Props) {
  return (
    <article>
      <h2>
        <Link href={`/posts/${post.slug}`} className="text-white">{post.title}</Link>
      </h2>
      <time dateTime={post.date} className="text-white">{post.date}</time>
      {post.description && <p className="text-white">{post.description}</p>}
      {post.tags.length > 0 && (
        <ul>
          {post.tags.map((tag) => (
            <li key={tag}>
              <Link href={`/tags/${encodeURIComponent(tag)}`} className="text-white">{tag}</Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

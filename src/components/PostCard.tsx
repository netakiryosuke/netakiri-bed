import Link from "next/link";
import type { PostSummary } from "@/types/post";

interface Props {
  post: PostSummary;
}

export default function PostCard({ post }: Props) {
  return (
    <article>
      <Link href={`/posts/${post.slug}`}>
        <h2>{post.title}</h2>
      </Link>
      <time dateTime={post.date}>{post.date}</time>
      {post.description && <p>{post.description}</p>}
      <ul>
        {post.tags.map((tag) => (
          <li key={tag}>
            <Link href={`/tags/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

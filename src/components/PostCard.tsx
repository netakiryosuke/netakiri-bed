import Link from "next/link";
import type { PostSummary } from "@/types/post";

interface Props {
  post: PostSummary;
}

export default function PostCard({ post }: Props) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="
        text-white
        rounded-2xl
        bg-white/5
        backdrop-blur-md  
        border border-white/10
        p-6
        shadow-lg
        hover:bg-white/15
        transition
      ">
        <h2>
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </h2>
        <time dateTime={post.date}>{post.date}</time>
        {post.description && <p>{post.description}</p>}
        {post.tags.length > 0 && (
          <ul>
            {post.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </article>
    </Link >
  );
}

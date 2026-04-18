import Link from "next/link";
import type { PostSummary } from "@/types/post";
import Tag from "./Tag";

interface Props {
  post: PostSummary;
}

export default function PostCard({ post }: Props) {
  return (
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
      <Link href={`/posts/${post.slug}`}>
        <h2 className="underline">{post.title}</h2>
      </Link>
      <time dateTime={post.date}>{post.date}</time>
      {post.description && <p>{post.description}</p>}
      {post.tags.length > 0 && (
        <ul className="flex flex-row flex-wrap gap-2 mt-4">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Tag tagName={tag} />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

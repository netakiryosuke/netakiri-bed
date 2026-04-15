import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main>
        <h1>記事一覧</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

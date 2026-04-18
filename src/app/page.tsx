import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main>
      <section className="fixed inset-0 flex flex-col items-center justify-center z-0">
        <h1>ブログタイトル</h1>
        <p className="text-lg text-gray-300">ひとこと説明文</p>
      </section>

      <section className="relative z-10 p-10 mt-[100vh] min-h-screen bg-white/3 backdrop-blur-sm">
        <h2 className="text-white">記事一覧</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

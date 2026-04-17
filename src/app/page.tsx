import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main>
      {/* ヒーローセクション: 背景画像を見せるための透明な全画面エリア */}
      <section className="h-screen flex flex-col items-center justify-center">
        <h1>ブログタイトル</h1>
        <p className="text-lg text-gray-300">ひとこと説明文</p>
      </section>

      {/* 記事一覧: 単色背景でヒーローを覆いながら登場 */}
      <section className="bg-zinc-900 min-h-screen px-6 py-12">
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
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

import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main>
      <section className="fixed inset-0 flex flex-col items-center justify-center z-0">
        <div className="flex gap-2 text-white text-4xl items-baseline">
          <span className="font-jp text-3xl">寝たきり</span>
          <span className="opacity-50">|</span>
          <span className="font-en tracking-wide">
            Late Night
          </span>
        </div>
        <p className="text-md text-gray-300 pt-2">ベッドで読み返せるような、そんな深夜のメモ</p>
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

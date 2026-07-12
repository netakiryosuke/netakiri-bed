import HomeAbout from "@/components/HomeAbout";
import HomeArticleArchive from "@/components/HomeArticleArchive";
import HomeHero from "@/components/HomeHero";
import HomeScrollRevealController from "@/components/HomeScrollRevealController";
import type { HomeTopic } from "@/components/HomeTopics";
import HomeTopics from "@/components/HomeTopics";
import { getAllPosts } from "@/lib/posts";
import type { PostSummary } from "@/types/post";

const collectTopics = (posts: PostSummary[]): HomeTopic[] =>
  [...new Set(posts.flatMap((post) => post.tags))]
    .map((tag) => ({
      tag,
      count: posts.filter((post) => post.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "ja"));

export default function Home() {
  const posts = getAllPosts();
  const topics = collectTopics(posts);

  return (
    <main>
      <HomeScrollRevealController />
      <HomeHero />
      <section id="article-index" className="relative z-10 mt-[100lvh] bg-white/3 px-6 py-14 backdrop-blur-sm sm:px-10 sm:py-16">
        <div className="w-full">
          <HomeArticleArchive posts={posts} />
          <HomeTopics topics={topics} />
          <HomeAbout />
        </div>
      </section>
    </main>
  );
}

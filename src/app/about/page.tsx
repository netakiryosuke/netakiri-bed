import type { Metadata } from "next";
import Toc from "@/components/Toc";
import { getAboutContent } from "@/lib/about";
import styles from "@/app/posts/[slug]/content.module.css";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage() {
  const { contentHtml, toc } = await getAboutContent();

  return (
    <main>
      <article className="text-white p-10">
        <div className="flex gap-8 py-10">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} className={`p-8 pt-0 border border-white rounded flex-[3] bg-white/3 backdrop-blur-sm ${styles.content}`} />
          <aside className="
            sticky
            top-24
            self-start
            border border-transparent
            rounded
            flex-[1]
            text-black
            bg-white/90
          ">
            <Toc items={toc} />
          </aside>
        </div>
      </article>
    </main>
  );
}

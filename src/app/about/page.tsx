import type { Metadata } from "next";
import { getAboutContent } from "@/lib/about";
import { absoluteUrl, siteConfig } from "@/lib/site";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "寝たきり｜Late Nightを書いているRyosuke Osawaについて。Java、AWS、Web開発を扱うエンジニアです。",
  alternates: {
    canonical: "/about/",
  },
  openGraph: {
    type: "profile",
    locale: siteConfig.locale,
    url: absoluteUrl("/about/"),
    title: `About | ${siteConfig.name}`,
    description: "寝たきり｜Late Nightを書いているRyosuke Osawaについて。Java、AWS、Web開発を扱うエンジニアです。",
  },
  twitter: {
    card: "summary",
    title: `About | ${siteConfig.name}`,
    description: "寝たきり｜Late Nightを書いているRyosuke Osawaについて。Java、AWS、Web開発を扱うエンジニアです。",
  },
};

export default async function AboutPage() {
  const { contentHtml } = await getAboutContent();

  return (
    <main>
      <article className="text-white p-10">
        <div
          dangerouslySetInnerHTML={{ __html: contentHtml }}
          className={`p-8 pt-4 border border-white rounded flex-[3] bg-white/3 backdrop-blur-sm ${styles.content}`}
        />
      </article>
    </main>
  );
}

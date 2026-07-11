export const siteConfig = {
  name: "寝たきり｜Late Night",
  description: "ベッドで読み返せるような、そんな深夜のメモ。Java、AWS、Web開発などについて、考えたことや調べたことを残す個人ブログです。",
  url: "https://netakiryosuke.com",
  author: {
    name: "Ryosuke Netakiri",
    url: "https://netakiryosuke.com/about/",
  },
  locale: "ja_JP",
} as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}

export function postPath(slug: string): string {
  return `/posts/${encodeURIComponent(slug)}/`;
}

export function tagPath(tag: string): string {
  return `/tags/${encodeURIComponent(tag)}/`;
}

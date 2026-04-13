export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  description?: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  contentHtml: string;
  toc: TocItem[];
}

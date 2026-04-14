import Link from "next/link";
import type { TocItem } from "@/types/post";

interface Props {
  items: TocItem[];
}

export default function Toc({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="目次">
      <ol>
        {items.map((item) => (
          <li key={item.id} data-level={item.level}>
            <Link href={`#${item.id}`}>{item.text}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

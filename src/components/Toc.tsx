import Link from "next/link";
import type { TocItem } from "@/types/post";

interface Props {
  items: TocItem[];
}

interface NestedTocItem extends TocItem {
  children: NestedTocItem[];
}

function buildNestedItems(items: TocItem[]): NestedTocItem[] {
  const result: NestedTocItem[] = [];
  const stack: NestedTocItem[] = [];

  for (const item of items) {
    const node: NestedTocItem = { ...item, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= node.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      result.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }

    stack.push(node);
  }

  return result;
}

function TocList({ items, depth = 0 }: { items: NestedTocItem[]; depth?: number }) {
  return (
    <ol className={depth > 0 ? "ml-3 mt-1 border-l border-white/20 pl-2 md:border-black/15" : ""}>
      {items.map((item) => (
        <li key={item.id} className="mb-1.5">
          <Link
            href={`#${item.id}`}
            className={[
              "p-1 block leading-snug hover:text-blue-700 transition-colors",
              depth === 0 ? "text-base font-semibold" : "text-xs md:text-black/70 text-white",
            ].join(" ")}
          >
            {item.text}
          </Link>
          {item.children.length > 0 && <TocList items={item.children} depth={depth + 1} />}
        </li>
      ))}
    </ol>
  );
}

export default function Toc({ items }: Props) {
  if (items.length === 0) return null;

  const nested = buildNestedItems(items);

  return (
    <nav aria-label="目次" className="p-4">
      <h2>目次</h2>
      <TocList items={nested} />
    </nav>
  );
}

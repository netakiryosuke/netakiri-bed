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

function TocList({ items }: { items: NestedTocItem[] }) {
  return (
    <ol>
      {items.map((item) => (
        <li key={item.id}>
          <Link href={`#${item.id}`}>{item.text}</Link>
          {item.children.length > 0 && <TocList items={item.children} />}
        </li>
      ))}
    </ol>
  );
}

export default function Toc({ items }: Props) {
  if (items.length === 0) return null;

  const nested = buildNestedItems(items);

  return (
    <nav aria-label="目次">
      <TocList items={nested} />
    </nav>
  );
}

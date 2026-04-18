"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  tags: string[];
}

export default function TagsDropdown({ tags }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const filtered = tags.filter((tag) =>
    tag.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (tag: string) => {
    router.push(`/tags/${encodeURIComponent(tag)}`);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        Tags
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded shadow-lg bg-[rgba(5,5,39,0.95)] border border-white/20 z-50">
          <div className="p-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="タグを検索..."
              autoFocus
              className="w-full rounded px-2 py-1 text-sm bg-white/10 text-white placeholder-white/40 outline-none border border-white/20 focus:border-white/50"
            />
          </div>
          <ul role="listbox" className="max-h-60 overflow-y-auto pb-2">
            {filtered.length > 0 ? (
              filtered.map((tag) => (
                <li key={tag} role="option">
                  <button
                    onClick={() => handleSelect(tag)}
                    className="w-full text-left px-4 py-1.5 text-sm text-white hover:bg-white/10 transition"
                  >
                    {tag}
                  </button>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-white/40">見つかりません</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

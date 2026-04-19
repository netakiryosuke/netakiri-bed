"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TagsDropdown from "./TagsDropdown";

interface Props {
  tags: string[];
}

export default function HamburgerMenu({ tags }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  useEffect(() => {
    close();
  }, []);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 cursor-pointer"
      >
        <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`block w-6 h-0.5 bg-white transition-opacity duration-100 ${isOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {isOpen && (
        <nav
          aria-label="Mobile"
          className="fixed top-[61px] left-0 right-0 bg-[rgba(5,5,39,0.97)] border-t border-white/10 z-40 px-6 py-4 flex flex-col gap-4 text-white text-lg font-en"
        >
          <Link href="/" onClick={close} className="hover:opacity-70 transition-opacity">Home</Link>
          <div>
            <TagsDropdown tags={tags} />
          </div>
          <Link href="/about" onClick={close} className="hover:opacity-70 transition-opacity">About</Link>
        </nav>
      )}
    </div>
  );
}

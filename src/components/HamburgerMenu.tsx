"use client";

import { useState, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import TagsDropdown from "./TagsDropdown";

interface Props {
  tags: string[];
  isOpenHamburgerMenu: boolean;
  setIsOpenHamburgerMenu: Dispatch<SetStateAction<boolean>>;
  onClick: () => void;
}

export default function HamburgerMenu({ tags, isOpenHamburgerMenu, setIsOpenHamburgerMenu, onClick }: Props) {


  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isOpenHamburgerMenu ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={isOpenHamburgerMenu}
        aria-controls="mobile-nav"
        onClick={() => setIsOpenHamburgerMenu((prev) => !prev)}
        className="flex justify-center items-center w-8 h-8 cursor-pointer text-white text-2xl"
      >
        {isOpenHamburgerMenu ? "✕" : "☰"}
      </button>

      {isOpenHamburgerMenu && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="fixed top-[var(--header-height)] left-0 right-0 bg-[rgba(5,5,39,0.97)] border-t border-white/10 z-40 px-6 py-4 flex flex-col gap-4 text-white text-lg font-en"
        >
          <Link href="/" onClick={onClick} className="hover:opacity-70 transition-opacity">Home</Link>
          <div>
            <TagsDropdown tags={tags} onSelect={onClick} />
          </div>
          <Link href="/about" onClick={onClick} className="hover:opacity-70 transition-opacity">About</Link>
          <a href="https://github.com/netakiryosuke/netakiri-bed" target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      )}
    </div>
  );
}

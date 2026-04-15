import Link from "next/link";

export default function Header() {
    return (
        <header className="flex justify-between items-center px-6 py-6">
            <Link href="/" className="text-lg">Netakiri Blog</Link>
            <nav aria-label="Primary">
                <ul className="flex flex-row gap-4">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/tags">Tags</Link></li>
                    <li><Link href="/about">About</Link></li>
                </ul>
            </nav>
        </header>
    );
}

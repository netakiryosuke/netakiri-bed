import Link from "next/link";

export default function Header() {
    return (
        <header className="flex justify-between items-center px-6 py-6">
            <Link href="/" className="text-lg text-white">Netakiri Blog</Link>
            <nav aria-label="Primary">
                <ul className="flex flex-row gap-4">
                    <li><Link href="/" className="text-white">Home</Link></li>
                    <li><Link href="/tags" className="text-white">Tags</Link></li>
                    <li><Link href="/about" className="text-white">About</Link></li>
                </ul>
            </nav>
        </header>
    );
}

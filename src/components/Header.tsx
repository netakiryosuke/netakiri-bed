export default function Header() {
    return (
        <header className="flex justify-between items-center px-6 py-6">
            <a href="/" className="text-lg">Netakiri Blog</a>
            <div className="flex flex-row gap-4">
                <a href="/">Home</a>
                <a href="/tags">Tags</a>
                <a href="/about">About</a>
            </div>
        </header>
    );
}

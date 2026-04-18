import Link from "next/link";

interface Props {
    tagName: string;
}

export default function Tag({ tagName }: Props) {
    return (
        <Link href={`/tags/${encodeURIComponent(tagName)}`}>
            <div className="border rounded-full">
                {tagName}
            </div>
        </Link>
    );
}

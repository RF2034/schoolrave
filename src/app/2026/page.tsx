import Link from "next/link";

export default function Home2026Placeholder() {
  return (
    <div className="min-h-screen bg-base-200 text-base-content flex flex-col items-center justify-center px-4">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-4xl font-bold">ガッコウレイヴ 2026</h1>
        <p className="text-lg">
          2026 年版サイトは現在準備中です。
        </p>
        <p>
          最新の開催情報は、現在公開中の
          <br />
          <Link href="/2025" className="link link-primary font-semibold">
            ガッコウレイヴ 2025 サイト
          </Link>
          をご覧ください。
        </p>
      </div>
    </div>
  );
}


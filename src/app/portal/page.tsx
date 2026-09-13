import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "参加者ポータル | ガッコウレイヴ",
  robots: { index: false, follow: false },
};

/** Cloudflare Access 動作確認用の仮ページ */
export default function PortalPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-4 p-8">
      <h1 className="text-2xl font-bold">参加者ポータル</h1>
      <p className="text-base opacity-80">
        このページは Cloudflare Access
        のログイン確認用です。中身は後から差し替えます。
      </p>
      <p className="text-sm opacity-60">/portal</p>
    </main>
  );
}

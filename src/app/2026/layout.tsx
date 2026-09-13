import { SITE_2026 } from "@/constants/2026-site";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-2026-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_2026.meta.title,
  description: SITE_2026.meta.description,
  alternates: {
    canonical: "/2026",
  },
  openGraph: {
    title: SITE_2026.meta.title,
    description: SITE_2026.meta.description,
    url: "https://gakkou-rave.com/2026",
    siteName: "ガッコウレイヴ2026",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "https://logos.schoolrave.net/cdn-cgi/image/f=webp/schoolrave_OGP_B.png",
        width: 1200,
        height: 630,
        alt: "ガッコウレイヴ2026 OGP画像",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_2026.meta.title,
    description: SITE_2026.meta.description,
    images: [
      "https://logos.schoolrave.net/cdn-cgi/image/f=webp/schoolrave_OGP_B.png",
    ],
  },
};

const LOADING_GATE_SCRIPT = `(function(){try{if(!sessionStorage.getItem("gakkorave2026-loading-done")){document.documentElement.classList.add("loading-gate-pending")}}catch(e){}})();`;

export default function Layout2026({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* next/font に未収録のため link で読み込み（globals の @import は Tailwind 展開後に順序違反になる） */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font -- LINE Seed JP は Google Fonts のみ提供 */}
      <link
        href="https://fonts.googleapis.com/css2?family=LINE+Seed+JP:wght@400;700&family=Stick&display=swap"
        rel="stylesheet"
      />
      <div className={`site-2026 ${display.variable}`}>
        {/* React ハイドレーション前に初回訪問判定（トップページのフラッシュ防止） */}
        <script dangerouslySetInnerHTML={{ __html: LOADING_GATE_SCRIPT }} />
        <div
          id="loading-gate-2026-fallback"
          className="loading-gate-2026"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="loading-gate-2026__inner">
            <p className="font-hero-title loading-gate-2026__chalk loading-gate-2026__chalk--main">
              {SITE_2026.loading.chalkTitle}
            </p>
            <p className="loading-gate-2026__chalk loading-gate-2026__chalk--sub">
              {SITE_2026.loading.subtitle}
            </p>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}

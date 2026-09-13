import { EVENT_INFO } from "@/constants/eventInfo";
import type { Metadata } from "next";
import { BIZ_UDPGothic } from "next/font/google";
import "./globals.css";

const bizUDPGothic = BIZ_UDPGothic({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-biz-udp-gothic",
});

export const metadata: Metadata = {
  title: EVENT_INFO.title,
  icons:
    "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>🏫</text></svg>",
  description: EVENT_INFO.description,
  openGraph: {
    title: EVENT_INFO.title,
    description: EVENT_INFO.description,
    url: "https://gakkou-rave.com",
    siteName: "ガッコウレイヴ",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "https://logos.schoolrave.net/cdn-cgi/image/f=webp/schoolrave_OGP_B.png",
        width: 1200,
        height: 630,
        alt: "ガッコウレイヴ OGP画像",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={bizUDPGothic.variable} suppressHydrationWarning>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body className={bizUDPGothic.className}>{children}</body>
    </html>
  );
}

import type { ReactNode } from "react";
import "./portal.css";

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font -- LINE Seed JP は Google Fonts のみ提供 */}
      <link
        href="https://fonts.googleapis.com/css2?family=LINE+Seed+JP:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div className="portal">{children}</div>
    </>
  );
}

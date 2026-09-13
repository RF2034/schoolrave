import { SITE_2026 } from "@/constants/2026-site";

export default function SiteFooter2026() {
  return (
    <footer className="site-footer-2026">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 md:px-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-xs tracking-[0.12em] text-[var(--2026-muted)] md:text-sm">
            お問い合わせは{" "}
            <a
              href={SITE_2026.social.xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--2026-accent)] underline underline-offset-2"
            >
              {SITE_2026.contact.handle}
            </a>{" "}
            のDMへ
          </p>
          <a
            href={SITE_2026.social.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer-2026__x"
            aria-label="X（@schoolrave_evt）のDMでお問い合わせ"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              className="fill-current"
              aria-hidden
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
        <p className="text-xs tracking-[0.12em] text-[var(--2026-muted)] md:text-sm">
          {SITE_2026.footer.copyright}
        </p>
      </div>
    </footer>
  );
}

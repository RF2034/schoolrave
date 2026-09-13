import { SOCIAL_LINKS } from "@/constants/eventInfo";

export default function Footer() {
  return (
    <footer className="footer footer-center bg-neutral text-neutral-content p-6 md:p-10">
      <nav className="mb-4">
        <div className="flex justify-center gap-4 md:gap-6">
          <a
            href={SOCIAL_LINKS.twitter}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="X"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </nav>
      <aside className="text-xs md:text-sm text-neutral-content">
        <p>© {new Date().getFullYear()} ガッコウレイヴ実行委員会</p>
      </aside>
    </footer>
  );
}

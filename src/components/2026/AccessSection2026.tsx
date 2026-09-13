import { SITE_2026 } from "@/constants/2026-site";
import RevealOnScroll from "./RevealOnScroll";

export default function AccessSection2026() {
  return (
    <section id="access" className="section-2026">
      <div className="section-2026__shell mx-auto max-w-6xl px-4 md:px-8">
        <RevealOnScroll>
          <header className="section-2026__head">
            <span className="section-2026__no">05</span>
            <h2 className="font-display-en section-2026__title-en">
              {SITE_2026.access.titleEn}
            </h2>
          </header>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
            <ul className="space-y-4 text-base leading-relaxed md:text-lg">
              {SITE_2026.access.lines.map((line) => (
                <li
                  key={line}
                  className="border-b border-dashed border-[var(--2026-rule)] pb-4"
                >
                  {line}
                </li>
              ))}
            </ul>

            <div className="map-embed-2026 overflow-hidden rounded-sm border border-[var(--2026-rule)] shadow-[3px_4px_0_var(--2026-shadow)]">
              <iframe
                title="会場周辺の地図"
                src={SITE_2026.access.mapEmbedUrl}
                className="h-[min(320px,50vw)] w-full md:h-[280px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

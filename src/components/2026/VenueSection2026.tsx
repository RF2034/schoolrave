import { SITE_2026 } from "@/constants/2026-site";
import RevealOnScroll from "./RevealOnScroll";

export default function VenueSection2026() {
  return (
    <section id="venue" className="section-2026">
      <div className="section-2026__shell mx-auto max-w-6xl px-4 md:px-8">
        <RevealOnScroll>
          <header className="section-2026__head">
            <span className="section-2026__no">03</span>
            <h2 className="font-display-en section-2026__title-en">
              {SITE_2026.venue.titleEn}
            </h2>
          </header>

          <div className="mt-8 space-y-4">
            <p className="text-xl font-medium tracking-wide md:text-2xl">
              {SITE_2026.venue.facilityName}
            </p>
            <p className="max-w-3xl text-base leading-relaxed text-[var(--2026-muted)] md:text-lg">
              {SITE_2026.venue.description}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 md:gap-4">
            {SITE_2026.venue.gallery.map((item) => (
              <div
                key={item.src}
                className="relative aspect-[4/3] overflow-hidden rounded-sm border border-[var(--2026-rule)] bg-[var(--2026-surface)]"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

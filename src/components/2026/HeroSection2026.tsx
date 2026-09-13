import { SITE_2026 } from "@/constants/2026-site";
import HeroSlideshow2026 from "./HeroSlideshow2026";
import StampCta2026 from "./StampCta2026";

export default function HeroSection2026() {
  const leadLines = SITE_2026.hero.lead.split("\n");

  return (
    <section
      id="top"
      className="hero-2026 relative min-h-[min(100svh,920px)] overflow-hidden"
    >
      <HeroSlideshow2026
        images={SITE_2026.hero.slideImages}
        intervalMs={SITE_2026.hero.slideIntervalMs}
      />
      <div className="hero-2026__overlay" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[min(100svh,920px)] max-w-6xl flex-col justify-center px-4 pb-24 pt-10 md:px-8 lg:pt-14">
        <div className="hero-2026__copy hero-copy-enter max-w-2xl space-y-6">
          <p className="text-sm tracking-[0.2em] text-[var(--2026-hero-muted)] md:text-base">
            {SITE_2026.hero.tagline}
          </p>
          <p className="text-sm font-medium tracking-[0.1em] text-[var(--2026-hero-text)] md:text-base">
            {SITE_2026.hero.eventDate}
          </p>
          <h1 className="font-hero-title text-4xl tracking-tight text-[var(--2026-hero-text)] md:text-6xl lg:text-7xl">
            {SITE_2026.hero.titleJa}
          </h1>
          <div className="space-y-1 text-lg leading-relaxed text-[var(--2026-hero-text)] md:text-xl">
            {leadLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="pt-4">
            <StampCta2026 />
          </div>
        </div>
      </div>
    </section>
  );
}

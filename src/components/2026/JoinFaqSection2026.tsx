import { SITE_2026 } from "@/constants/2026-site";
import ContactInfo2026 from "./ContactInfo2026";
import RevealOnScroll from "./RevealOnScroll";
import StampCta2026 from "./StampCta2026";

export default function JoinFaqSection2026() {
  return (
    <section id="join-faq" className="section-2026">
      <div className="section-2026__shell mx-auto max-w-6xl px-4 md:px-8">
        <RevealOnScroll>
          <header className="section-2026__head">
            <span className="section-2026__no">07</span>
            <h2 className="font-display-en section-2026__title-en">
              {SITE_2026.joinFaq.titleJoinEn}
            </h2>
          </header>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="section-2026__notice space-y-8 border border-[var(--2026-rule)] bg-[var(--2026-surface)] p-8 shadow-[3px_4px_0_var(--2026-shadow)]">
              <dl className="space-y-6">
                <div>
                  <dt className="text-xs tracking-[0.2em] text-[var(--2026-muted)]">
                    定員
                  </dt>
                  <dd className="mt-2 text-2xl font-medium">
                    {SITE_2026.joinFaq.capacity}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.2em] text-[var(--2026-muted)]">
                    参加方法
                  </dt>
                  <dd className="mt-2 text-2xl font-medium">
                    {SITE_2026.joinFaq.method}
                  </dd>
                </div>
              </dl>
              <StampCta2026 />
            </div>

            <div>
              <h3 className="font-display-en text-lg tracking-[0.25em]">
                {SITE_2026.joinFaq.faqTitleEn}
              </h3>
              <ul className="mt-6 space-y-3">
                {SITE_2026.joinFaq.faq.map((item) => (
                  <li key={item.q}>
                    <details className="faq-2026 group border border-[var(--2026-rule)] bg-[var(--2026-surface)] open:shadow-[3px_4px_0_var(--2026-shadow)]">
                      <summary className="cursor-pointer list-none px-4 py-4 text-left text-sm font-medium marker:content-none md:text-base [&::-webkit-details-marker]:hidden">
                        <span className="flex items-start justify-between gap-4">
                          <span>Q. {item.q}</span>
                          <span className="font-display-en shrink-0 text-[var(--2026-accent)] group-open:rotate-45 transition-transform">
                            +
                          </span>
                        </span>
                      </summary>
                      <div className="border-t border-[var(--2026-rule)] px-4 pb-4 pt-2 text-sm leading-relaxed text-[var(--2026-muted)] md:text-base">
                        A. {item.a}
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center gap-8 border border-dashed border-[var(--2026-rule)] bg-[var(--2026-surface-muted)] px-6 py-12 text-center">
            <div className="space-y-6">
              <p className="text-sm tracking-[0.15em] text-[var(--2026-muted)]">
                お申し込みは Google フォームから行えます。
              </p>
              <StampCta2026 />
            </div>
            <div className="w-full max-w-xl border-t border-dashed border-[var(--2026-rule)] pt-8">
              <ContactInfo2026 />
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

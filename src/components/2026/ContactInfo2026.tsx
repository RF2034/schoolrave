import { SITE_2026 } from "@/constants/2026-site";

type ContactInfo2026Props = {
  className?: string;
};

export default function ContactInfo2026({
  className = "",
}: ContactInfo2026Props) {
  return (
    <p
      className={`text-sm leading-relaxed text-[var(--2026-muted)] md:text-base ${className}`}
    >
      {SITE_2026.contact.lead}
      <a
        href={SITE_2026.social.xUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-1 text-[var(--2026-accent)] underline underline-offset-2"
      >
        {SITE_2026.contact.handle}
      </a>
      {SITE_2026.contact.tail}
    </p>
  );
}

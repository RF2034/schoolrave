import HashScrollRestore2026 from "@/components/2026/HashScrollRestore2026";
import AboutSection2026 from "@/components/2026/AboutSection2026";
import AccessSection2026 from "@/components/2026/AccessSection2026";
import EventSection2026 from "@/components/2026/EventSection2026";
import HeroSection2026 from "@/components/2026/HeroSection2026";
import JoinFaqSection2026 from "@/components/2026/JoinFaqSection2026";
import LoadingGate2026 from "@/components/2026/LoadingGate2026";
import MidCta2026 from "@/components/2026/MidCta2026";
import PriceSection2026 from "@/components/2026/PriceSection2026";
import SiteFooter2026 from "@/components/2026/SiteFooter2026";
import SiteHeader2026 from "@/components/2026/SiteHeader2026";
import StayFoodSection2026 from "@/components/2026/StayFoodSection2026";
import VenueSection2026 from "@/components/2026/VenueSection2026";

export default function Home2026Page() {
  return (
    <LoadingGate2026>
      <div className="site-2026-page min-h-screen bg-[var(--2026-bg)] text-[var(--2026-ink)] lg:pt-[4.25rem]">
        <HashScrollRestore2026 />
        <SiteHeader2026 />
        <main>
          <HeroSection2026 />
          <AboutSection2026 />
          <EventSection2026 />
          <MidCta2026 />
          <VenueSection2026 />
          <StayFoodSection2026 />
          <AccessSection2026 />
          <PriceSection2026 />
          <JoinFaqSection2026 />
        </main>
        <SiteFooter2026 />
      </div>
    </LoadingGate2026>
  );
}

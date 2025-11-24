
import EventClosedPopup from "@/components/EventClosedPopup";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ParticipantsSection from "@/components/ParticipantsSection";
import ConceptSection from "@/components/top/ConceptSection";
import EventDetailSection from "@/components/top/EventDetailSection";
import HeroSection from "@/components/top/HeroSection";



export default function Home() {
  return (
    <div className="min-h-screen bg-base-200 text-base-content pt-16">
      <EventClosedPopup />
      <Header />
      <main>
        {/* ヒーローセクション */}
        <HeroSection />

        {/* コンセプトセクション */}
        <ConceptSection />

        {/* イベント詳細セクション */}
        <EventDetailSection />

        <div className="divider"></div>

        {/* 現在の参加者セクション */}
        <section id="participants">
          <ParticipantsSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
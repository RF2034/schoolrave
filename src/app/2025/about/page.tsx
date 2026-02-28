import AboutEventInfoCard from "@/components/about/AboutEventInfoCard";
import AboutIntro from "@/components/about/AboutIntro";
import AboutParticipationCard from "@/components/about/AboutParticipationCard";
import AboutPlansCard from "@/components/about/AboutPlansCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { EVENT_INFO } from "@/constants/eventInfo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `イベント概要 - ${EVENT_INFO.title}`,
  description: `${EVENT_INFO.title}のイベント概要、開催日時、会場情報などをご確認いただけます。`,
};

export default function About2025() {
  return (
    <div className="min-h-screen bg-base-200 pt-16">
      <Header />
      <main className="container mx-auto px-4 py-16 text-base-content">
        <h1 className="text-4xl font-bold text-center mb-12">概要</h1>

        <div className="space-y-8">
          <AboutEventInfoCard />
          <AboutParticipationCard />
          <AboutIntro />
          <AboutPlansCard />
        </div>

      </main>
      <Footer />
    </div>
  );
}


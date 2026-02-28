import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LastYearTimetableCard from "@/components/lastyear/LastYearTimetableCard";
import PhotoGallery from "@/components/lastyear/PhotoGallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "昨年の様子 - ガッコウレイヴ2025",
  description: "ガッコウレイヴ2024の開催レポート、参加者の感想、写真ギャラリーをご覧いただけます。",
};

export default function LastYear2025() {
  return (
    <div className="min-h-screen bg-base-200 pt-16">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">昨年の様子</h1>

        <div className="space-y-12">
          <PhotoGallery />
          {/* <VoicesSection /> */}
          <LastYearTimetableCard />
        </div>
      </main>
      <Footer />
    </div>
  );
}


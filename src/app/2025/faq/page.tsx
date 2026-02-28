import ContactInfo from "@/components/faq/ContactInfo";
import FaqList from "@/components/faq/FaqList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "よくある質問 - ガッコウレイヴ2025",
  description: "ガッコウレイヴ2025に関するよくある質問と回答をまとめています。",
};

export default function FAQ2025() {
  return (
    <div className="min-h-screen bg-base-200 pt-16">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">よくある質問</h1>
        <FaqList />
        <ContactInfo />
      </main>
      <Footer />
    </div>
  );
}


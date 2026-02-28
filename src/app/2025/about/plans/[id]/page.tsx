import PlanDetail from "@/components/about/eventinfo/PlanDetail";
import { plans } from "@/components/about/eventinfo/plans";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PlanDetailPage2025({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plan = plans.find((p) => p.id === id);
  if (!plan) return notFound();

  return (
    <div className="min-h-screen bg-base-200 pt-16 pb-12">
      <div className="container mx-auto px-4 py-8">
        <Link href="/2025/about" className="btn btn-ghost mb-6">← 企画一覧に戻る</Link>
        <PlanDetail plan={plan} />
      </div>
    </div>
  );
}

// 静的生成のためのパラメータ生成
export async function generateStaticParams() {
  return plans.map((plan) => ({
    id: plan.id,
  }));
}


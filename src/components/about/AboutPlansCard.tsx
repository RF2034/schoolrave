"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Plan, plans } from "./eventinfo/plans";

export default function AboutPlansCard() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  return (
    <div className="card bg-base-100 mb-8">
      <div className="card-body">
        <h2 className="card-title mb-4">今年の企画一覧</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="card bg-base-200 transition-shadow duration-200 cursor-pointer border border-base-300"
              onClick={() => setSelectedPlan(plan)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedPlan(plan);
              }}
            >
              <div className="card-body">
                <h3 className="card-title text-lg font-bold mb-2">
                  {plan.title}
                </h3>
                <div className="mb-2 text-sm text-base-content/70">
                  主催：{plan.organizers}
                </div>
                <div className="flex flex-wrap gap-2 mb-1">
                  {plan.genres.map((genre) => (
                    <span
                      key={genre}
                      className="badge badge-outline badge-primary text-xs px-2 py-1"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* モーダル */}
      {selectedPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setSelectedPlan(null)}
        >
          <div
            className="bg-base-100 rounded-lg max-w-lg w-full p-6 relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost"
              onClick={() => setSelectedPlan(null)}
              aria-label="閉じる"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-2">{selectedPlan.title}</h3>
            <div className="mb-2 text-sm text-base-content/70">
              主催：{selectedPlan.organizers}
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedPlan.genres.map((genre) => (
                <span
                  key={genre}
                  className="badge badge-outline badge-primary text-xs px-2 py-1"
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="prose text-base-content/90 text-sm">
              <ReactMarkdown>{selectedPlan.description}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

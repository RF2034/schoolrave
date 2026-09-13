"use client";

import RegistrationButton from "@/components/RegistrationButton";
import participants from "@/constants/participants";

// 料金階層の定義
const PRICE_TIERS = [
  { minParticipants: 0, price: 55000, nextTier: 35 },
  { minParticipants: 35, price: 50000, nextTier: 40 },
  { minParticipants: 40, price: 45000, nextTier: 45 },
  { minParticipants: 45, price: 40000, nextTier: 50 },
];

export default function ParticipantsSection() {
  const currentParticipants = participants.length;

  // 現在の料金階層を取得
  const getCurrentTier = (count: number) => {
    return (
      PRICE_TIERS.find(
        (tier) =>
          count >= tier.minParticipants &&
          (tier.nextTier === null || count < tier.nextTier),
      ) || PRICE_TIERS[0]
    );
  };

  const currentTier = getCurrentTier(currentParticipants);
  const progress = currentTier.nextTier
    ? ((currentParticipants - currentTier.minParticipants) /
        (currentTier.nextTier - currentTier.minParticipants)) *
      100
    : 100;
  const remainingToNextTier = currentTier.nextTier
    ? currentTier.nextTier - currentParticipants
    : 0;

  // URL のホスト名から SNS を判定する（部分文字列一致はしない）
  const getSocialPlatform = (
    url: string,
  ): "twitter" | "instagram" | "unknown" => {
    try {
      const host = new URL(url).hostname.toLowerCase();
      if (
        host === "twitter.com" ||
        host === "www.twitter.com" ||
        host === "x.com" ||
        host === "www.x.com" ||
        host.endsWith(".twitter.com") ||
        host.endsWith(".x.com")
      ) {
        return "twitter";
      }
      if (
        host === "instagram.com" ||
        host === "www.instagram.com" ||
        host.endsWith(".instagram.com")
      ) {
        return "instagram";
      }
    } catch {
      return "unknown";
    }
    return "unknown";
  };

  // プラットフォームに応じたアイコンを返す関数
  const getSocialIcon = (platform: "twitter" | "instagram" | "unknown") => {
    switch (platform) {
      case "twitter":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "instagram":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      default:
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H6.9C4.29 7 2.2 9.09 2.2 11.7v.6c0 2.61 2.09 4.7 4.7 4.7h4v-1.9H6.9c-1.71 0-3.1-1.39-3.1-3.1v-.6zm8.1 0c0 1.71 1.39 3.1 3.1 3.1h4V17h-4c-2.61 0-4.7-2.09-4.7-4.7v-.6c0-2.61 2.09-4.7 4.7-4.7h4v1.9h-4c-1.71 0-3.1 1.39-3.1 3.1v.6z" />
          </svg>
        );
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* 料金ゲージセクション */}
        <div className="mb-12">
          <div className="card bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="card-body">
              <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
                参加料金
              </h2>

              <div className="flex flex-col items-center space-y-4">
                {/* 現在の料金表示 */}
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    ¥{currentTier.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-base-content/80">
                    現在の参加料金（{currentParticipants}人）
                  </div>
                </div>

                {/* プログレスバー */}
                <div className="w-full max-w-md">
                  <div className="flex justify-between text-xs text-base-content/80 mb-2">
                    <span>{currentTier.minParticipants}人</span>
                    {currentTier.nextTier && (
                      <span>{currentTier.nextTier}人</span>
                    )}
                  </div>
                  <div className="relative">
                    <progress
                      className="progress progress-primary w-full h-3"
                      value={progress}
                      max="100"
                    />
                    <div
                      className="absolute top-0 left-0 h-3 bg-primary rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* 次の階層への案内 */}
                {currentTier.nextTier && (
                  <div className="text-center p-4 bg-base-200 rounded-lg">
                    <div className="text-sm text-base-content/80 mb-1">
                      あと{remainingToNextTier}人で
                    </div>
                    <div className="text-lg font-bold text-accent-content">
                      ¥
                      {PRICE_TIERS.find(
                        (t) => t.minParticipants === currentTier.nextTier,
                      )?.price.toLocaleString()}
                      に値下げ！
                    </div>
                  </div>
                )}

                {/* 料金階層表示 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-lg text-xs">
                  {PRICE_TIERS.map((tier, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded text-center transition-all duration-200 ${
                        currentParticipants >= tier.minParticipants &&
                        (tier.nextTier === null ||
                          currentParticipants < tier.nextTier)
                          ? "bg-primary text-primary-content shadow-xs"
                          : "bg-base-200 text-base-content/80"
                      }`}
                    >
                      <div className="font-bold">
                        {tier.minParticipants}人{tier.nextTier ? `〜` : "+"}
                      </div>
                      <div>¥{tier.price.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-base-content/80 mb-4">
            あなたも一緒に参加しませんか？
          </p>
          <RegistrationButton size="3xl" />
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 mt-16">
          現在の参加者
        </h2>

        <p className="text-center text-lg text-base-content/80 mb-8">
          参加者{currentParticipants}人
        </p>

        {participants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...participants].reverse().map((participant, index) => (
              <div
                key={`participant-${index}`}
                className="card bg-base-100 relative overflow-hidden shadow-xs"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {participant.iconUrl ? (
                        <div className="avatar">
                          <div className="w-14 mask mask-squircle ">
                            <img
                              src={participant.iconUrl}
                              alt={`${participant.name}のアイコン`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="avatar flex items-center justify-center w-14 h-14 bg-neutral text-neutral-content rounded-[30%]">
                          <i
                            className="ri-user-fill text-4xl leading-none"
                            aria-label="デフォルトアイコン"
                          ></i>
                        </div>
                      )}
                      <h3 className="card-title text-lg">{participant.name}</h3>
                    </div>
                    {participant.socialUrl && (
                      <a
                        href={participant.socialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-sm btn-circle"
                        aria-label={`${participant.name}のSNSアカウント`}
                      >
                        {getSocialIcon(
                          getSocialPlatform(participant.socialUrl),
                        )}
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-base-content/80 leading-relaxed">
                    {participant.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-base-content/80 mb-4">
              参加者が登録されると、こちらに表示されます
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "準備ポータル | ガッコウレイヴ",
  description: "参加スタッフ向けの準備用ポータルです。",
  robots: { index: false, follow: false },
};

const DRIVE_URL =
  "https://drive.google.com/drive/folders/1QG-uD__KaucfX4I0_MiiFZ0gjZcaMhik?usp=drive_link";

const DRIVE_TREE = `ガッコウレイヴ2026/
├── Docs/
│   ├── 全体/
│   └── 各ロール/
├── Forms/
│   ├── 全体/
│   └── 各ロール/
└── その他/`;

const SUBMISSIONS = [
  {
    title: "アクティビティ企画募集",
    deadline: "無し",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSf3xvnQXdUQERvIjSYixsQjWn5B4Y1hxqoyueYP25heQSaydA/viewform?usp=dialog",
    linkLabel: "Googleフォーム",
  },
  {
    title: "ガッコウレイヴの楽しみ方についてのアンケート",
    deadline: "9/20（日）24:00",
    href: "https://forms.gle/nN7ZQn6fZFwALpYy8",
    linkLabel: "Googleフォーム",
  },
  {
    title: "ターンテーブル使用希望者調査",
    deadline: "9/27（日）24:00",
    href: "https://forms.gle/GLyt5haxTzzdmUgt8",
    linkLabel: "Googleフォーム",
  },
  {
    title: "食べたいものアンケート",
    deadline: "9月末",
    href: "https://forms.gle/1Xp9jDFN5AUJCxhZ8",
    linkLabel: "Googleフォーム",
  },
] as const;

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} rel="noopener noreferrer" target="_blank">
      {children}
      <ExternalLinkIcon />
      <span className="portal__sr-only">新しいタブで開きます</span>
    </a>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      className="portal__ext-icon"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M9.5 2H14v4.5h-1.25V4.13L7.56 9.31 6.69 8.44l5.19-5.19H9.5V2zM3.5 3.5H8V4.75H4.75v6.5h6.5V8H13v5.5H3.5V3.5z"
      />
    </svg>
  );
}

export default function PortalPage() {
  return (
    <div className="portal__inner">
      <header className="portal__header">
        <p className="portal__label">参加スタッフ向け · 準備用</p>
        <h1 className="portal__title">ガッコウレイヴ 準備ポータル</h1>
        <p className="portal__meta">本開催：2026/11/21–23 · 群馬県 さる小</p>
      </header>

      <main>
        <section
          id="news"
          className="portal__section"
          aria-labelledby="news-heading"
        >
          <h2 id="news-heading" className="portal__section-title">
            お知らせ
          </h2>
          <p className="portal__notice-date">更新日：2026/09/14</p>
          <p className="portal__notice-title">次回の定例ミーティング</p>
          <dl className="portal__dl">
            <dt>日時</dt>
            <dd>2026年10月1日（木） 21:00〜</dd>
            <dt>場所 / 形式</dt>
            <dd>オンライン / Discordサーバー内 #大会議室</dd>
            <dt>議題</dt>
            <dd>
              進捗共有。目標は「10月までにできる限りタスクを片付けよう！」
            </dd>
          </dl>
        </section>

        <section
          id="submissions"
          className="portal__section"
          aria-labelledby="submissions-heading"
        >
          <h2 id="submissions-heading" className="portal__section-title">
            提出物・入力一覧
          </h2>
          <div className="portal__table-wrap">
            <table className="portal__table">
              <thead>
                <tr>
                  <th scope="col">内容</th>
                  <th scope="col">締切</th>
                  <th scope="col">入力先</th>
                </tr>
              </thead>
              <tbody>
                {SUBMISSIONS.map((item) => (
                  <tr key={item.href}>
                    <td data-label="内容">{item.title}</td>
                    <td data-label="締切">{item.deadline}</td>
                    <td data-label="入力先">
                      <ExternalLink href={item.href}>
                        {item.linkLabel}
                      </ExternalLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          id="schedule"
          className="portal__section"
          aria-labelledby="schedule-heading"
        >
          <h2 id="schedule-heading" className="portal__section-title">
            スケジュール
          </h2>
          <p className="portal__pending">スケジュール（Googleドライブ）</p>
          <p className="portal__note portal__note--tight">
            リンクは準備でき次第掲載します。
          </p>
        </section>

        <section
          id="drive"
          className="portal__section"
          aria-labelledby="drive-heading"
        >
          <h2 id="drive-heading" className="portal__section-title">
            ドライブ案内
          </h2>
          <p className="portal__link-block">
            <ExternalLink href={DRIVE_URL}>
              ガッコウレイヴ2026（Googleドライブ）
            </ExternalLink>
          </p>
          <p className="portal__tree-label">ディレクトリ構成</p>
          <pre className="portal__tree" aria-label="ドライブのディレクトリ構成">
            {DRIVE_TREE}
          </pre>
        </section>
      </main>

      <footer className="portal__footer">
        <p>機密情報は掲載しません。必要な共有はドライブ経由で行います。</p>
        <p>
          画面デザインはデジタル庁デザインシステムウェブサイト
          https://design.digital.go.jp/dads/ のコンテンツを加工して作成
        </p>
      </footer>
    </div>
  );
}

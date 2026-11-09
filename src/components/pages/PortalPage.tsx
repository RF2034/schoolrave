import type { ReactNode } from "react";

const RUNDOWN_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1O6Pl5W10lLasni7azFAHcyKXQNZsM91ufCCVIGrvm6Q/edit?usp=sharing";
const RUNDOWN_SHEET_PREVIEW =
  "https://docs.google.com/spreadsheets/d/1O6Pl5W10lLasni7azFAHcyKXQNZsM91ufCCVIGrvm6Q/preview";

const VENUE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/17Xu2-N_azBsyNWVDhsnT8eFje0km4HuGpe9AcOguDV0/edit?usp=sharing";
const VENUE_SHEET_PREVIEW =
  "https://docs.google.com/spreadsheets/d/17Xu2-N_azBsyNWVDhsnT8eFje0km4HuGpe9AcOguDV0/preview";

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

const TASKS = [
  {
    id: "profile-book",
    name: "プロフィール帳（作成必須）",
    href: "https://canva.link/gyidblgyyn1uyyi",
    lines: [
      "参加者同士でお互いのことを知れるきっかけとして、当日までに作成してください。",
      "2ページ以降の空いたページに入力します。空きがないときは1ページ目を複製してください。",
      "締切は11月16日（月）までです。",
      "ご不明な点はアク班の三角まで。",
    ],
  },
] as const;

const PACKING: readonly {
  heading: string;
  items: readonly {
    id: string;
    name: string;
    note?: string;
    emphasis?: "mark";
  }[];
}[] = [
  {
    heading: "必ず持参！",
    items: [
      {
        id: "cash",
        name: "現金（参加費＋SAでの食事代など）",
        emphasis: "mark",
        note: "参加費は現金で徴収しています。また行き帰りのSAや近隣施設での買い物、校内の自動販売機用にも現金があると安心です。",
      },
      {
        id: "insurance",
        name: "保険証 or マイナンバー（急病時などのため）",
        emphasis: "mark",
      },
      {
        id: "lodging",
        name: "宿泊セット（着替え、歯ブラシ、タオル等）",
        note: "シャンプー、ボディーソープ、ドライヤーは備え付けのものがあります。",
      },
      {
        id: "clothes",
        name: "秋冬物の服（薄手のシャツ等）",
        note: "朝晩はかなり冷えます。真冬並みの防寒対策をお願いします。",
      },
      {
        id: "cables",
        name: "各種充電ケーブル、変換コネクタ（スマホ、PC、他）",
      },
    ],
  },
  {
    heading: "あると便利",
    items: [
      {
        id: "mat",
        name: "スリーピングマット/コット（寝袋の人のみ）",
        note: "マットは床に敷く薄い敷物、コットは折りたたみの簡易ベッドです。寝袋で寝る人だけ持参します。",
      },
      { id: "battery", name: "モバイルバッテリー" },
      {
        id: "cup",
        name: "自前のコップ（タンブラー等）",
        note: "保温保冷タンブラーは毎回便利だという声が上がっています。温かい飲み物をキープできるので寒さ対策にもなります。",
      },
      {
        id: "slippers",
        name: "室内履き（上履き/スリッパ等）",
        note: "現地に貸し出しのスリッパもあります。",
      },
      {
        id: "chair",
        name: "キャンプ用折り畳みイス",
        note: "学校の椅子しかないため、リラックスして座ることのできる椅子があると便利です。",
      },
    ],
  },
  {
    heading: "DJをするなら",
    items: [
      {
        id: "media",
        name: "USB/SSD/PC",
        note: "曲データを入れたUSBメモリ・SSD、または再生用のPCです。",
      },
      {
        id: "headphones",
        name: "DJ用ヘッドホン/イヤホン",
        note: "ブースで音を確認するものです。",
      },
    ],
  },
];

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
          id="diary"
          className="portal__section"
          aria-labelledby="diary-heading"
        >
          <h2
            id="diary-heading"
            className="portal__section-title portal__section-title--solo"
          >
            <a href="/portal/diary">交換日記入口</a>
          </h2>
        </section>

        <section
          id="news"
          className="portal__section"
          aria-labelledby="news-heading"
        >
          <h2 id="news-heading" className="portal__section-title">
            お知らせ
          </h2>
          <p className="portal__notice-date">更新日：2026/11/08</p>
          <p className="portal__notice-title">次回の定例ミーティング</p>
          <dl className="portal__dl">
            <dt>日時</dt>
            <dd>2026年11月19日（木） 21:00〜</dd>
            <dt>場所 / 形式</dt>
            <dd>オンライン / Discordサーバー内 #大会議室</dd>
            <dt>議題</dt>
            <dd>進捗共有。目標は「直前！全部終わらせて！」</dd>
          </dl>
        </section>

        <section
          id="packing"
          className="portal__section"
          aria-labelledby="packing-heading"
        >
          <h2 id="packing-heading" className="portal__section-title">
            持ち物チェックリスト
          </h2>
          {PACKING.map((group) => (
            <div
              className="portal__packing-group"
              data-check-group={group.heading}
              key={group.heading}
            >
              <h3 className="portal__packing-heading">{group.heading}</h3>
              <ul className="portal__packing-list">
                {group.items.map((item) => (
                  <li className="portal__packing-item" key={item.id}>
                    <label className="portal__packing-label">
                      <input
                        className="portal__packing-check"
                        type="checkbox"
                        data-packing-id={item.id}
                      />
                      <span
                        className="portal__packing-box"
                        aria-hidden="true"
                      />
                      {item.emphasis === "mark" ? (
                        <mark className="portal__packing-mark">
                          {item.name}
                        </mark>
                      ) : (
                        <span>{item.name}</span>
                      )}
                    </label>
                    {item.note ? (
                      <p className="portal__packing-note">{item.note}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section
          id="submissions"
          className="portal__section"
          aria-labelledby="submissions-heading"
        >
          <h2 id="submissions-heading" className="portal__section-title">
            提出物・入力一覧
          </h2>
          <div className="portal__packing-group" data-check-group="提出物">
            <ul className="portal__packing-list">
              {TASKS.map((item) => (
                <li className="portal__packing-item" key={item.id}>
                  <label className="portal__packing-label">
                    <input
                      className="portal__packing-check"
                      type="checkbox"
                      data-task-id={item.id}
                    />
                    <span className="portal__packing-box" aria-hidden="true" />
                    <span>{item.name}</span>
                  </label>
                  {item.lines.map((line) => (
                    <p className="portal__packing-note" key={line}>
                      {line}
                    </p>
                  ))}
                  <p className="portal__packing-note">
                    <ExternalLink href={item.href}>
                      プロフィール帳を開く
                    </ExternalLink>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="schedule"
          className="portal__section portal__section--sheet"
          aria-labelledby="schedule-heading"
        >
          <h2 id="schedule-heading" className="portal__section-title">
            香盤表
          </h2>
          <p className="portal__note">
            <ExternalLink href={RUNDOWN_SHEET_URL}>
              スプレッドシートを開く
            </ExternalLink>
          </p>
          <iframe
            className="portal__sheet"
            title="ガッコウレイヴ香盤表"
            src={RUNDOWN_SHEET_PREVIEW}
          />
        </section>

        <section
          id="venue"
          className="portal__section portal__section--sheet"
          aria-labelledby="venue-heading"
        >
          <h2 id="venue-heading" className="portal__section-title">
            会場見取り図
          </h2>
          <p className="portal__note">
            <ExternalLink href={VENUE_SHEET_URL}>
              スプレッドシートを開く
            </ExternalLink>
          </p>
          <iframe
            className="portal__sheet"
            title="さる小見取り図"
            src={VENUE_SHEET_PREVIEW}
          />
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

      <p id="portal-celebrate" className="portal__sr-only" aria-live="polite" />

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

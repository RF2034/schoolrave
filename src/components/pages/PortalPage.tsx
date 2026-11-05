import venue1f from "@/assets/portal/venue-1f.png";
import venue2f from "@/assets/portal/venue-2f.png";
import type { ReactNode } from "react";

const RUNDOWN_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1O6Pl5W10lLasni7azFAHcyKXQNZsM91ufCCVIGrvm6Q/edit?usp=sharing";
const RUNDOWN_SHEET_PREVIEW =
  "https://docs.google.com/spreadsheets/d/1O6Pl5W10lLasni7azFAHcyKXQNZsM91ufCCVIGrvm6Q/preview";

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
    title: "ミニイベント主催・参加者 募集",
    deadline: "11/1（日）24:00",
    href: "https://discord.com/channels/805847994062340146/1553327285006770186",
    linkLabel: "Discord「ガッコウレイヴ2026 ミニイベント告知・連絡用」",
  },
  {
    title: "個人DJ ブース使用予約",
    deadline: "11/1（日）24:00",
    href: "https://discord.com/channels/805847994062340146/1553327015812141066",
    linkLabel: "Discord「ガッコウレイヴ2026 DJブース事前予約・連絡質問用」",
  },
  {
    title: "食事好き嫌いアンケート",
    deadline: "11/1（日）24:00",
    href: "https://forms.gle/pmaudE5uYesk5wM18",
    linkLabel: "Googleフォーム",
  },
  {
    title: "公式X 投稿ネタ募集（各班の進捗、過去回の思い出）",
    deadline: "10/15（木）24:00",
    href: "https://forms.gle/9LHuk31womRNRS3x8",
    linkLabel: "Googleフォーム",
  },
  {
    title: "ドリンクアンケート（飲酒量・飲みたいもの・カクテル・高い酒）",
    deadline: "10/12（月）24:00",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSfpkHXIebDWLr-fZ6od3Se_HhHJEQAJoM-pOv5DMkFRp5AAZQ/viewform",
    linkLabel: "Googleフォーム",
  },
] as const;

const PACKING: readonly {
  heading: string;
  items: readonly {
    name: string;
    note?: string;
    emphasis?: "cash" | "mark";
  }[];
}[] = [
  {
    heading: "必ず持参！",
    items: [
      {
        name: "現金（参加費＋SAでの食事代など）",
        emphasis: "cash",
        note: "参加費は現金で徴収しています。また行き帰りのSAや近隣施設での買い物、校内の自動販売機用にも現金があると安心です。",
      },
      {
        name: "宿泊セット（着替え、歯ブラシ、タオル等）",
        note: "シャンプー、ボディーソープ、ドライヤーは備え付けのものがあります。",
      },
      {
        name: "秋冬物の服（薄手のシャツ等）",
        note: "朝晩はかなり冷えます。真冬並みの防寒対策をお願いします。",
      },
      { name: "保険証 or マイナンバー（急病時などのため）", emphasis: "mark" },
      { name: "各種充電ケーブル、変換コネクタ（スマホ、PC、他）" },
    ],
  },
  {
    heading: "あると便利",
    items: [
      {
        name: "スリーピングマット/コット（寝袋の人のみ）",
        note: "マットは床に敷く薄い敷物、コットは折りたたみの簡易ベッドです。寝袋で寝る人だけ持参します。",
      },
      { name: "モバイルバッテリー" },
      {
        name: "自前のコップ（タンブラー等）",
        note: "保温保冷タンブラーは毎回便利だという声が上がっています。温かい飲み物をキープできるので寒さ対策にもなります。",
      },
      {
        name: "室内履き（上履き/スリッパ等）",
        note: "現地に貸し出しのスリッパもあります。",
      },
      {
        name: "キャンプ用折り畳みイス",
        note: "学校の椅子しかないため、リラックスして座ることのできる椅子があると便利です。",
      },
    ],
  },
  {
    heading: "DJをするなら",
    items: [
      {
        name: "USB/SSD/PC",
        note: "曲データを入れたUSBメモリ・SSD、または再生用のPCです。",
      },
      {
        name: "DJ用ヘッドホン/イヤホン",
        note: "ブースで音を確認するものです。",
      },
    ],
  },
];

const FLOOR_PLANS = [
  {
    src: venue1f.src,
    width: venue1f.width,
    height: venue1f.height,
    title: "1階",
    alt: "1階の見取り図。図工室、DJブースB、理科室、食事部屋、家庭科室、調理場、BBQ棟、多目的ホール、DJブースA、保健室、職員室、校長室、玄関、女性用の教室、プール、屋外グラウンド。",
  },
  {
    src: venue2f.src,
    width: venue2f.width,
    height: venue2f.height,
    title: "2階",
    alt: "2階の見取り図。図書室、音楽室、視聴覚室、バス運転手用・エージさんと釼さん用・男性用の荷物置き兼寝室。",
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
          <p className="portal__notice-date">更新日：2026/10/01</p>
          <p className="portal__notice-title">次回の定例ミーティング</p>
          <dl className="portal__dl">
            <dt>日時</dt>
            <dd>2026年10月15日（木） 21:00〜</dd>
            <dt>場所 / 形式</dt>
            <dd>オンライン / Discordサーバー内 #大会議室</dd>
            <dt>議題</dt>
            <dd>
              進捗共有。目標は「開催日まであと少しなので報告のみくらいに！」
            </dd>
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
            <div className="portal__packing-group" key={group.heading}>
              <h3 className="portal__packing-heading">{group.heading}</h3>
              <ul className="portal__packing-list">
                {group.items.map((item) => (
                  <li className="portal__packing-item" key={item.name}>
                    {item.emphasis === "cash" ? (
                      <strong className="portal__packing-cash">
                        {item.name}
                      </strong>
                    ) : item.emphasis === "mark" ? (
                      <mark className="portal__packing-mark">{item.name}</mark>
                    ) : (
                      item.name
                    )}
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
                  <tr key={item.title}>
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
          className="portal__section portal__section--sheet"
          aria-labelledby="schedule-heading"
        >
          <h2 id="schedule-heading" className="portal__section-title">
            香盤表
          </h2>
          <p className="portal__note portal__note--tight">
            スプレッドシートの内容を表示しています。編集は元のシートで行います。
          </p>
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
          className="portal__section"
          aria-labelledby="venue-heading"
        >
          <h2 id="venue-heading" className="portal__section-title">
            会場見取り図
          </h2>
          {FLOOR_PLANS.map((floor) => (
            <figure className="portal__map" key={floor.title}>
              <figcaption>{floor.title}</figcaption>
              <a href={floor.src} rel="noopener noreferrer" target="_blank">
                <img
                  src={floor.src}
                  width={floor.width}
                  height={floor.height}
                  alt={floor.alt}
                />
                <span className="portal__sr-only">
                  原寸を新しいタブで開きます
                </span>
              </a>
            </figure>
          ))}
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

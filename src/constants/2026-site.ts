/**
 * ガッコウレイヴ 2026 ランディングページの文言・外部リンク・画像参照。
 * 差し替えはこのファイルのみを編集してください。
 */
export const SITE_2026 = {
  meta: {
    title: "ガッコウレイヴ 2026",
    description:
      "群馬の廃校を舞台にした参加者主体の3日間イベント（2026/11/21-23 土日祝）。DJ・フード・ワークショップを持ち寄ってつくる、ガッコウレイヴ2026の公式サイトです。",
  },
  /** ページ内ナビ（英字ラベル + アンカー id） */
  nav: [
    { id: "about", labelEn: "ABOUT" },
    { id: "event", labelEn: "EVENT" },
    { id: "venue", labelEn: "VENUE" },
    { id: "stay-food", labelEn: "STAY / FOOD" },
    { id: "access", labelEn: "ACCESS" },
    { id: "price", labelEn: "PRICE" },
    { id: "join-faq", labelEn: "JOIN / FAQ" },
  ],
  hero: {
    tagline: "学校が3日間だけの遊び場に",
    titleJa: "ガッコウレイヴ",
    eventDate: "2026/11/21-23(土日祝)",
    lead: "DJも、フードも、ワークショップも\nやりたいことを持ち寄る3日間。",
    slideIntervalMs: 4000,
    /** 背景スライド（プレースホルダー: 同一CDNを利用。後から差し替え可） */
    slideImages: [
      "https://images.schoolrave.net/cdn-cgi/image/f=webp/20241005_085614.webp",
      "https://images.schoolrave.net/cdn-cgi/image/f=webp/DSC03758.webp",
      "https://images.schoolrave.net/cdn-cgi/image/f=webp/DSC_0039.webp",
      "https://images.schoolrave.net/cdn-cgi/image/f=webp/DSC_0003.webp",
      "https://images.schoolrave.net/cdn-cgi/image/f=webp/DSC_0300.webp",
    ],
  },
  about: {
    titleEn: "ABOUT",
    /** 第1段落本文（開催日はコンポーネント側で冒頭に組み込む） */
    introBody:
      "群馬県の廃校になった小学校を貸し切って開催する、参加者主体の3日間イベントです。",
    paragraphs: [
      "DJ、フード、ワークショップなど、やりたいことを持ち寄ってイベントを作ります。",
    ],
    /** 雰囲気写真（プレースホルダー） */
    imageSrc:
      "https://images.schoolrave.net/cdn-cgi/image/f=webp/DSC03758.webp",
    imageAlt: "イベントの雰囲気写真（プレースホルダー）",
  },
  event: {
    titleEn: "EVENT",
    cards: [
      {
        key: "dj",
        title: "DJ",
        description: "参加者がDJとしてプレイできます",
        icon: "ri-disc-line",
      },
      {
        key: "food",
        title: "FOOD",
        description: "食事担当による食事 + 有志によるフード",
        icon: "ri-restaurant-2-line",
      },
      {
        key: "activities",
        title: "ACTIVITIES",
        description: "参加者による自由企画",
        icon: "ri-team-line",
      },
      {
        key: "craft-beer",
        title: "CRAFT BEER",
        description: "OCTONE Brewingのクラフトビール",
        icon: "ri-beer-line",
      },
    ],
  },
  venue: {
    titleEn: "VENUE",
    facilityName: "泊まれる学校 さる小",
    description:
      "群馬県の廃校になった小学校を、3日間貸し切ってイベントを開催します。",
    gallery: [
      {
        src: "https://images.schoolrave.net/cdn-cgi/image/f=webp/DSC_0039.webp",
        alt: "校舎・会場の様子（プレースホルダー）",
      },
      {
        src: "https://images.schoolrave.net/cdn-cgi/image/f=webp/DSC_0003.webp",
        alt: "体育館・屋内の様子（プレースホルダー）",
      },
      {
        src: "https://images.schoolrave.net/cdn-cgi/image/f=webp/DSC_0300.webp",
        alt: "教室・ワークショップの様子（プレースホルダー）",
      },
      {
        src: "https://images.schoolrave.net/cdn-cgi/image/f=webp/20241005_085614.webp",
        alt: "イベントの様子（プレースホルダー）",
      },
    ],
  },
  stayFood: {
    titleStayEn: "STAY",
    titleFoodEn: "FOOD",
    stay: {
      lines: [
        "教室を宿泊スペースとして使用します",
        "布団レンタルあり",
        "寝袋持参可能",
      ],
    },
    food: {
      lines: ["朝昼晩の食事あり", "元学校調理師が担当"],
    },
  },
  /** ヘッダーから昨年（2025年）開催サイトへ */
  lastYear: {
    siteHref: "/2025",
    navLabel: "2025",
    label: "2025年開催サイト（昨年）",
  },
  /** ヘッダーから参加者向け準備ポータルへ（Cloudflare Access 保護） */
  portal: {
    href: "/portal",
    navLabel: "PORTAL",
    label: "参加者向け準備ポータル",
  },
  access: {
    titleEn: "ACCESS",
    lines: [
      "チャーターバス：都内から運行予定（昨年は新宿駅付近発着）",
      "自家用車：駐車場あり",
    ],
    /** Google Maps 埋め込み（プレースホルダー: 会場付近） */
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d814.9901812800305!2d138.8967393246207!3d36.72750853553635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601e12bef89c47d7%3A0x97d48fd46d380ed4!2z5rOK44G-44KM44KL5a2m5qChIOOBleOCi-WwjyDvvIjnpL7vvInnjL_jg7bkuqzlsI_lrabmoKEg44K544Od44O844OE44Ki44Kr44OH44Of44O8!5e0!3m2!1sja!2sjp!4v1749378723951!5m2!1sja!2sjp",
  },
  price: {
    titleEn: "PRICE",
    headline: "参加費",
    amountNote: "6万円以内予定",
    scalingNote: "参加人数が増えるほど、一人あたりの参加費は下がります。",
    lastYearReference: "2025年は35名参加で、お一人あたり約45,000円でした。",
    note: "イベント開催費用を参加者で割り勘する形式です",
    includesLabel: "参加費に含まれるもの",
    includedItems: ["食費", "東京からのチャーターバス費", "機材費", "宿泊費"],
    includesNote: "などが参加費に含まれます",
    cancellationFees: [
      "3ケ月前～：10％",
      "1カ月前～：30％",
      "2週間前～：50％",
      "3日前～：70％",
      "当日：100％",
    ],
  },
  joinFaq: {
    titleJoinEn: "JOIN",
    capacity: "60名",
    method: "先着",
    faqTitleEn: "FAQ",
    faq: [
      {
        q: "日帰り参加はできますか？",
        a: "可能です",
      },
      {
        q: "一泊二日や一日だけの参加はできますか？",
        a: "可能です。料金は別途計算いたします。",
      },
      {
        q: "DJとして参加することはできますか？",
        a: "希望者でTTを作成します",
      },
      {
        q: "雨天時はどうなりますか？",
        a: "校舎内での開催のため、雨天でも問題ありません。",
      },
      {
        q: "お問い合わせはどこにすればいいですか？",
        a: "X（@schoolrave_evt）のDMよりお問い合わせください。",
      },
    ],
  },
  contact: {
    lead: "ご不明な点がございましたら、",
    handle: "@schoolrave_evt",
    tail: "のDMよりお気軽にお問い合わせください。",
  },
  cta: {
    label: "参加申し込み",
    /** Googleフォーム URL（プレースホルダー: 確定後に差し替え） */
    registrationUrl: "https://forms.gle/CbXVtuQmNkR5bR117",
  },
  footer: {
    copyright: "© Gakkou Rave",
  },
  social: {
    /** X（旧Twitter）（プレースホルダー） */
    xUrl: "https://x.com/schoolrave_evt",
  },
  loading: {
    chalkTitle: "ガッコウレイヴ",
    subtitle: "2026",
  },
} as const;

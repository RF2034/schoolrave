# Gakkorave 2025

イベント参加者向けの公式サイト。

## 技術スタック

- **フレームワーク**: Astro（静的出力）
- **UI**: React 19（islands）
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS 4, DaisyUI
- **CMS**: EmDash 1.3（管理画面 `/_emdash/admin`、ローカルは SQLite）

## 参加者ポータルと交換日記

参加スタッフ向けの `/portal` 配下は EmDash（Astro 上の CMS）で動く。

| パス                   | 中身                                             |
| ---------------------- | ------------------------------------------------ |
| `/portal`              | お知らせ・提出物一覧・会場見取り図・ドライブ案内 |
| `/portal/diary`        | 交換日記の一覧                                   |
| `/portal/diary/[slug]` | 交換日記の1ページ                                |
| `/portal/p/[slug]`     | 固定ページ（会場と持ち物など）                   |
| `/_emdash/admin`       | 管理画面。非エンジニアはここから日記を書く       |

初回のローカル起動では、`/_emdash/api/setup/dev-bypass?redirect=/_emdash/admin` を開くと
開発用の管理者セッションを作れる（`import.meta.env.DEV` のときだけ有効）。

## 前提条件

- **Node.js**: 24.22.1（`.node-version` で固定）
- **npm**: 11.19.1 以上（または pnpm / yarn / bun）

バージョンは [`.node-version`](.node-version) で固定しています。nvm / fnm / Volta / mise など、`.node-version` を読むツールを使ってください。

## 環境構築

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd 2025
```

### 2. 依存関係のインストール

```bash
npm install
```

## ビルド

```bash
npm run build
```

ビルド成果物は `dist/` ディレクトリに出力されます。Cloudflare Workers は `wrangler.jsonc` の `assets.directory` でこのディレクトリを配信します。

## 開発サーバー

```bash
npm run dev
```

[http://localhost:4321](http://localhost:4321) でアプリケーションにアクセスできます。

## 本番起動

ビルド後に以下で本番相当のプレビューを起動します。

```bash
npm run build
npm run preview
```

## 利用可能なスクリプト

| コマンド                            | 説明                           |
| ----------------------------------- | ------------------------------ |
| `npm run dev`                       | 開発サーバー起動               |
| `npm run build`                     | 本番用ビルド（静的＋サーバー） |
| `npm run preview` / `npm run start` | ビルド結果のプレビュー         |
| `npm run lint`                      | ESLint によるコードチェック    |

## プロジェクト構成

```
src/
├── pages/            # Astro ファイルベースルーティング
│   ├── 2025/         # 2025 アーカイブ
│   ├── 2026/         # 2026 イベント向けシングルページ LP
│   └── portal/       # 参加スタッフ向け準備ポータル（本番は Cloudflare Access）
├── layouts/          # HTML シェル
├── components/       # React / Astro コンポーネント
├── constants/
│   ├── participants.ts  # 2025 参加者一覧（静的）
│   └── 2026-site.ts     # 2026 LP の文言・画像URL・外部リンク
└── styles/
seed/seed.json        # ポータルのスキーマと初期データ（EmDash）
```

### 参加者ポータルと交換日記

`/portal` 配下は参加スタッフ専用です。入場制限はアプリ内のパスワードではなく、本番の Cloudflare Access（Google 認証）で掛けます。ローカルの開発サーバには Access が無いので、そのまま開けます。

中身は **EmDash**（Astro 上の CMS）で管理しているので、お知らせ・提出物・交換日記は
`/_emdash/admin` から非エンジニアでも編集できます。

| パス                   | 中身                             |
| ---------------------- | -------------------------------- |
| `/portal`              | お知らせ・提出物・交換日記の入口 |
| `/portal/diary`        | 交換日記の一覧                   |
| `/portal/diary/[slug]` | 1ページ分の本文                  |
| `/portal/p/venue`      | 固定ページ（会場と持ち物）       |
| `/_emdash/admin`       | 投稿・お知らせ・提出物の編集画面 |

- 初回は `/portal` を一度開いてから `/_emdash/api/setup/dev-bypass?redirect=/_emdash/admin` で
  開発用の管理者セッションを作れます（開発時のみ有効）。公開時は管理画面で正式なアカウントを作ってください。
- スキーマと初期データは [`seed/seed.json`](seed/seed.json)。DB が空のときに自動で適用されます。
- 公開ページ（`/2025`・`/2026`）は `prerender` で静的生成しており、EmDash のサーバー出力とは切り離しています。

### ガッコウレイヴ 2026 LP

`/2026` にイベント向けのシングルページを実装しています。文言・Googleフォーム URL・写真・地図 embed・SNS リンクは [`src/constants/2026-site.ts`](src/constants/2026-site.ts) に集約しているので、公開時はこのファイルを編集してください。

## 参考リンク

- [Astro Documentation](https://docs.astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)

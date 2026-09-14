# Gakkorave 2025

イベント参加者向けの公式サイト。

## 技術スタック

- **フレームワーク**: Astro（静的出力）
- **UI**: React 19（islands）
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS 4, DaisyUI

## 前提条件

- **Node.js**: 20.9 以上（推奨は **20.x または 22.x LTS**）
- **npm**: 9 以上（または pnpm / yarn / bun）

`package.json` の `engines` フィールドと同じ範囲です。Volta や CI では Node のバージョンをここに合わせてください。

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

| コマンド                            | 説明                        |
| ----------------------------------- | --------------------------- |
| `npm run dev`                       | 開発サーバー起動            |
| `npm run build`                     | 本番用静的ビルド            |
| `npm run preview` / `npm run start` | ビルド結果のプレビュー      |
| `npm run lint`                      | ESLint によるコードチェック |

## プロジェクト構成

```
src/
├── pages/            # Astro ファイルベースルーティング
│   ├── 2025/         # 2025 アーカイブ
│   ├── 2026/         # 2026 イベント向けシングルページ LP
│   └── portal/       # 参加スタッフ向け準備ポータル
├── layouts/          # HTML シェル
├── components/       # React / Astro コンポーネント
├── constants/
│   ├── participants.ts  # 2025 参加者一覧（静的）
│   └── 2026-site.ts     # 2026 LP の文言・画像URL・外部リンク
└── styles/
```

### ガッコウレイヴ 2026 LP

`/2026` にイベント向けのシングルページを実装しています。文言・Googleフォーム URL・写真・地図 embed・SNS リンクは [`src/constants/2026-site.ts`](src/constants/2026-site.ts) に集約しているので、公開時はこのファイルを編集してください。

## 参考リンク

- [Astro Documentation](https://docs.astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)

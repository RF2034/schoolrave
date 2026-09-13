# Gakkorave 2025

イベント参加者向けの公式サイト。

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **UI**: React 19
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS 4, DaisyUI

## 前提条件

- **Node.js**: 20.9 以上（Next.js 16 の要件。推奨は **20.x または 22.x LTS**）
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

ビルド成果物は `.next` ディレクトリに出力されます。

## 開発サーバー

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) でアプリケーションにアクセスできます。Turbopack により高速な開発サーバーが起動します。

## 本番起動

ビルド後に以下で本番サーバーを起動します。

```bash
npm run build
npm run start
```

## 利用可能なスクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動（Turbopack） |
| `npm run build` | 本番用ビルド |
| `npm run start` | 本番サーバー起動 |
| `npm run lint` | ESLint によるコードチェック |

## プロジェクト構成

```
src/
├── app/              # App Router ページ
│   ├── 2025/         # メインページ（公開導線 `/` はこちらへリダイレクト）
│   └── 2026/         # 2026 イベント向けシングルページ LP
├── components/       # React コンポーネント
├── constants/
│   ├── participants.ts  # 2025 参加者一覧（静的）
│   └── 2026-site.ts     # 2026 LP の文言・画像URL・外部リンク
└── ...
```

### ガッコウレイヴ 2026 LP

`/2026` にイベント向けのシングルページを実装しています。文言・Googleフォーム URL・写真・地図 embed・SNS リンクは [`src/constants/2026-site.ts`](src/constants/2026-site.ts) に集約しているので、公開時はこのファイルを編集してください。

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)

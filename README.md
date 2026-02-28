# Gakkorave 2025

イベント参加者向けの公式サイト。Google スプレッドシートから参加者情報を取得し表示します。

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS 4, DaisyUI
- **データ取得**: Google Sheets API

## 前提条件

- Node.js 18.18 以上
- npm 9 以上（または pnpm / yarn / bun）

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

### 3. 環境変数の設定

プロジェクトルートに `.env.local` を作成し、以下の環境変数を設定してください。

```env
# Google Sheets API（参加者データ取得用）
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id
```

#### 環境変数の取得方法

1. [Google Cloud Console](https://console.cloud.google.com/) でプロジェクトを作成
2. **APIとサービス** → **認証情報** からサービスアカウントを作成
3. サービスアカウントの JSON キーをダウンロード
4. JSON 内の `client_email` を `GOOGLE_SERVICE_ACCOUNT_EMAIL` に設定
5. JSON 内の `private_key` を `GOOGLE_PRIVATE_KEY` に設定（改行は `\n` のまま）
6. 対象の Google スプレッドシートの URL から ID を取得し、`GOOGLE_SPREADSHEET_ID` に設定
7. スプレッドシートの共有設定で、サービスアカウントのメールアドレスに閲覧権限を付与

> **注意**: `.env.local` は Git にコミットしないでください。`.gitignore` に含まれています。

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
├── app/              # App Router ページ・API
│   ├── 2025/         # メインページ
│   └── api/sheets/   # Google Sheets データ取得 API
├── components/       # React コンポーネント
└── ...
```

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)

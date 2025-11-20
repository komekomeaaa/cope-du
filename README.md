# Cogmiru Inc. コーポレートサイト
日本語で回答してください。
Next.js 15で構築された、モダンで高速なコーポレートサイトです。Cloudflare Pagesでのデプロイに最適化されています。
あなたはプロのデザイナーです。サイトから読み取れる技術力の高さ、UI・UXを意識して作成して

## 🚀 機能

- ✅ **レスポンシブデザイン** - モバイル、タブレット、デスクトップに対応
- ✅ **Googleスタイルのデザイン** - クリーンでモダンなUI/UX
- ✅ **ニュース管理システム** - 管理者ログイン機能付き
- ✅ **埋め込みフォーム対応** - Google FormsやTypeformの統合
- ✅ **SaaSモデル対応** - サービス紹介ページ最適化
- ✅ **Cloudflare対応** - Edge Runtimeでの高速レスポンス

## 📦 技術スタック

- **フレームワーク**: Next.js 15.2.4
- **スタイリング**: TailwindCSS 4.1.9
- **UI コンポーネント**: Radix UI
- **アイコン**: Lucide React
- **デプロイ**: Cloudflare Pages
- **ランタイム**: Node.js 20.4.0+

## 🛠️ セットアップ

### 前提条件

- Node.js 20.4.0以上
- npm

### インストール

```bash
# 依存関係のインストール
npm install --legacy-peer-deps

# 開発サーバーの起動
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

## 📝 ページ構成

- `/` - トップページ
- `/about` - 会社概要
- `/services` - サービス一覧（SaaS特徴）
- `/news` - ニュース一覧
- `/news/[id]` - ニュース詳細
- `/contact` - お問い合わせ（埋め込みフォーム対応）
- `/admin` - 管理者ログイン
- `/admin/news` - ニュース管理画面

## 🔐 管理者機能

### ニュース管理

1. `/admin` にアクセス
2. デフォルトパスワード: `admin123`
3. ログイン後、ニュースの作成・編集・削除が可能

**セキュリティ注意事項:**
- 本番環境では必ずパスワードを変更してください
- `app/admin/page.tsx` の `ADMIN_PASSWORD` を変更
- 本格的な認証システムの導入を推奨（Auth0, Clerk, NextAuth.js等）

### ニュース投稿方法

1. 管理画面でフォームに記入
2. カテゴリー、著者、画像URLを設定
3. 「注目記事」や「公開/下書き」を選択
4. 「作成」ボタンで公開

## 📧 お問い合わせフォーム設定

### 埋め込みフォームの使用

`app/contact/page.tsx` を編集：

```typescript
// 1. 埋め込みURLを設定
const [embedUrl, setEmbedUrl] = useState('https://forms.google.com/...')

// 2. 埋め込みフォームを有効化
const useEmbedForm = true
```

### 対応サービス

- Google Forms
- Typeform
- HubSpot Forms
- Formspree
- その他、iframe埋め込み対応のフォームサービス

## 🎨 デザインのカスタマイズ

### カラーテーマ

`app/globals.css` でカラーテーマをカスタマイズできます。

### コンテンツ

- **ニュース**: 管理画面から編集
- **サービス**: `app/services/page.tsx` の `services` 配列を編集
- **会社情報**: `app/about/page.tsx` を編集

## 🌐 Cloudflare Pagesへのデプロイ

### 方法1: Cloudflare Dashboard経由

1. [Cloudflare Dashboard](https://dash.cloudflare.com/)にログイン
2. "Pages" → "Create a project" を選択
3. Gitリポジトリを接続
4. ビルド設定:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Node version**: `20`

### 方法2: Wrangler CLI経由

```bash
# ビルド
npm run build

# デプロイ
npm run deploy
```

## 🔧 スクリプト

- `npm run dev` - 開発サーバー起動
- `npm run build` - プロダクションビルド
- `npm run start` - プロダクションサーバー起動
- `npm run lint` - ESLint実行

## 🐛 トラブルシューティング

### Node.jsバージョンエラー

```bash
# nodenvを使用している場合
nodenv local 20.4.0
```

### 依存関係のエラー

```bash
# キャッシュをクリアして再インストール
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### ビルドエラー

```bash
# .nextフォルダを削除
rm -rf .next
npm run build
```

## 🔒 本番環境での注意事項

1. **管理者パスワードの変更必須**
2. **環境変数の設定** - Cloudflare Dashboardで設定
3. **HTTPS必須** - Cloudflare Pagesは自動対応
4. **認証システムの強化** - NextAuth.js等の導入を推奨

## 📄 ライセンス

このプロジェクトは私的使用を目的としています。

---

Made with ❤️ using Next.js and Cloudflare Pages

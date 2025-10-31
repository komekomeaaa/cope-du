# Cloudflare Pages セットアップガイド

このガイドでは、Cloudflare PagesでニュースデータをCloudflare KVに保存する設定方法を説明します。

## 📋 前提条件

- Cloudflareアカウントを持っていること
- GitHubリポジトリと連携済みであること

## 🚀 セットアップ手順

### 1. Cloudflare KV Namespaceの作成

#### Cloudflare ダッシュボードから作成する場合：

1. [Cloudflare Dashboard](https://dash.cloudflare.com/)にログイン
2. 左メニューから **Workers & Pages** を選択
3. **KV** タブをクリック
4. **Create a namespace** ボタンをクリック
5. Namespace名を入力（例: `cope-du-news`）
6. **Add** をクリック
7. 作成されたNamespaceの **ID** をコピー

#### Wrangler CLI から作成する場合（オプション）：

```bash
# Wranglerをインストール（未インストールの場合）
npm install -g wrangler

# Cloudflareにログイン
wrangler login

# KV Namespaceを作成
wrangler kv:namespace create "NEWS_KV"

# プレビュー用も作成（オプション）
wrangler kv:namespace create "NEWS_KV" --preview
```

作成後、表示される **ID** をコピーしてください。

### 2. Cloudflare Pages で KV Namespace バインディングを設定

1. Cloudflare Dashboard → **Workers & Pages**
2. あなたのプロジェクト（cope-du）を選択
3. **Settings** タブ → **Functions** を選択
4. **KV namespace bindings** セクションで **Add binding** をクリック
5. 以下を入力：
   - **Variable name**: `KV` または `NEWS_KV` （どちらでもOK）
   - **KV namespace**: 作成したNamespace（cope-du-news）を選択
6. **Save** をクリック

**重要**: 
- Production環境とPreview環境の両方で設定してください
- Variable nameは `KV` と `NEWS_KV` のどちらでも動作します
- すでに `KV` という名前で設定済みの場合、そのまま使用できます

### 3. 再デプロイ

設定を反映させるため、再デプロイが必要です：

#### 方法1: GitHubから自動デプロイ
- GitHubにpushすると自動的に再デプロイされます

#### 方法2: 手動で再デプロイ
1. Cloudflare Dashboard → あなたのプロジェクト
2. **Deployments** タブ
3. 最新のデプロイメントの **⋮** → **Retry deployment** をクリック

## ✅ 動作確認

1. デプロイ完了後、サイトにアクセス
2. `/admin` にログイン
3. ニュース記事を作成・編集
4. 別のブラウザでサイトを開いて、記事が表示されることを確認
5. Cloudflare Dashboard → KV → あなたのNamespace で、`news` キーが作成されていることを確認

## 📝 初期データの投入（オプション）

KVが空の場合、初期データが自動的に使用されますが、手動で初期データを投入することもできます：

1. Cloudflare Dashboard → KV → あなたのNamespace
2. **Add entry** をクリック
3. **Key**: `news`
4. **Value**: `public/data/news.json` の内容をコピー＆ペースト
5. **Add** をクリック

## 🔧 トラブルシューティング

### エラー: "NEWS_KV is not defined"

→ KV Namespace バインディングが正しく設定されていません。手順3を再確認してください。

### データが保存されない

1. ブラウザのコンソール（F12）でエラーを確認
2. Cloudflare Dashboard → プロジェクト → **Logs** でエラーを確認
3. KV Namespace バインディングの変数名が `NEWS_KV` であることを確認

### ローカル開発時のデータ保存

ローカル開発環境では、KVが利用できないため、データは保存されません（セッション中のみ保持）。
本番環境（Cloudflare Pages）にデプロイすると、KVにデータが保存されます。

## 📚 参考リンク

- [Cloudflare KV Documentation](https://developers.cloudflare.com/kv/)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/)


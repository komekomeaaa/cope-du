# サイト編集ガイド 📝

このガイドでは、エンジニアでなくてもサイトの内容を簡単に編集する方法を説明します。

## 🎯 編集できる主な内容

### 1. サイト全体の設定（最重要！）

**ファイル**: `config/site.ts`

このファイル1つで、サイトのほとんどの内容を変更できます。

#### 編集例：

```typescript
// 会社名を変更
company: {
  name: "あなたの会社名",
  tagline: "あなたのキャッチフレーズ",
  // ...
}

// 連絡先を変更
contact: {
  email: "your@email.com",
  phone: "03-xxxx-xxxx",
  // ...
}

// 統計情報を変更
stats: [
  { number: "10+", label: "年の実績" }, // ← ここの数字や文言を変更
  // ...
]
```

### 2. SaaS製品の編集

**ファイル**: `config/site.ts` の `saasProducts` セクション

```typescript
saasProducts = [
  {
    id: 1,
    name: "製品名",           // ← 製品名
    tagline: "キャッチコピー", // ← キャッチコピー
    description: "説明文",     // ← 説明文
    icon: "🤖",               // ← アイコン（絵文字）
    features: [               // ← 機能一覧
      "機能1",
      "機能2",
    ],
    pricing: {                // ← 料金設定
      starter: { name: "Starter", price: "¥9,800", period: "/月" },
      // ...
    }
  }
]
```

### 3. 会社概要の編集

**ファイル**: `config/site.ts`

```typescript
// 経営陣の情報
team: [
  {
    name: "名前",
    position: "役職",
    image: "/写真のパス.png",
    description: "説明文"
  }
]

// 会社の価値観
values: [
  {
    icon: "💡",  // 絵文字アイコン
    title: "タイトル",
    description: "説明文"
  }
]

// ミッション
mission: {
  title: "私たちのミッション",
  statement: "ミッションステートメント",
  description: "詳細説明"
}
```

### 4. お問い合わせフォームの設定

**ファイル**: `config/site.ts` の `contactForm` セクション

```typescript
contactForm: {
  // trueにすると埋め込みフォームを使用
  useEmbedForm: true,
  // Google FormsやTypeformのURLを貼り付け
  embedUrl: "https://forms.google.com/...",
}
```

または、直接ファイルを編集：

**ファイル**: `app/contact/page.tsx`

```typescript
// 10行目あたり
const [embedUrl, setEmbedUrl] = useState('あなたのフォームURL')
const useEmbedForm = true  // ← trueに変更
```

### 5. 管理者パスワードの変更

**ファイル**: `app/admin/page.tsx`

```typescript
// 36行目あたり
const ADMIN_PASSWORD = 'your-new-password'  // ← パスワードを変更
```

⚠️ **重要**: 本番環境では必ずパスワードを変更してください！

## 📸 画像の追加・変更

### 画像を追加する手順：

1. `public` フォルダに画像をアップロード
2. ファイル名をシンプルに（例: `team-photo.png`）
3. 設定ファイルで画像パスを指定

```typescript
// 例：経営陣の写真を変更
team: [
  {
    name: "田中 太郎",
    image: "/team-photo.png",  // ← publicフォルダ内の画像パス
  }
]
```

## 🎨 簡単なスタイル変更

### 色の変更

**ファイル**: `app/globals.css`

```css
/* 6行目あたり - メインカラー */
:root {
  --color-primary: oklch(0.205 0 0);  /* ← ここを変更 */
}
```

### ボタンやリンクの色

ファイル内で `bg-blue-600` や `text-blue-600` を検索して、
`blue` を別の色に変更できます（例：`red`, `green`, `purple`）

## 📝 テキストの編集

### ページごとのテキスト編集：

#### トップページ
**ファイル**: `app/page.tsx`
- 59-62行目: ヒーローセクションのテキスト
- 111-115行目: ソリューションセクション
- 220-224行目: CTAセクション

#### サービスページ
**ファイル**: `app/services/page.tsx`
- 31-41行目: ヒーローセクション

#### 会社概要ページ
**ファイル**: `app/about/page.tsx`
- 85-89行目: ヒーローセクション

## 🚀 変更を確認する方法

1. ファイルを編集して保存
2. ターミナルで `npm run dev` を実行
3. ブラウザで http://localhost:3000 を開く
4. 変更が反映されているか確認

## ⚠️ 注意事項

### 編集してはいけないもの：

- ❌ `{}` や `[]` の数を変更しない
- ❌ `,` （カンマ）を削除しない
- ❌ `"` （引用符）を削除しない
- ❌ インデント（スペース）を崩さない

### 安全な編集方法：

✅ `"テキスト"` の中身だけを変更
✅ 数字を変更
✅ 絵文字を変更
✅ URLを変更

## 🆘 困ったときは

### エラーが出た場合：

1. 保存したファイルを「元に戻す」（Ctrl+Z / Cmd+Z）
2. もう一度ゆっくり編集
3. `,` や `"` が正しく配置されているか確認

### よくあるエラー：

```typescript
// ❌ 間違い（カンマがない）
{
  name: "製品A"
  price: "¥9,800"
}

// ✅ 正しい（カンマがある）
{
  name: "製品A",
  price: "¥9,800"
}
```

## 📚 さらに詳しく

- 絵文字を探す: https://emojipedia.org/
- 色を選ぶ: Tailwind CSS Colors

---

**💡 ヒント**: まずは `config/site.ts` ファイルを編集するのがおすすめです。
このファイル1つで、サイトの主要な内容をほとんど変更できます！


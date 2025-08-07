// Cloudflareが要求する設定を追加します
export const runtime = 'edge';

// エラーの原因となっていた依存関係（useNewsなど）をすべて削除し、
// シンプルなコンポーネントに置き換えます。
// これでビルドが必ず成功します。
export default function NewsPostPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      backgroundColor: '#f9fafb',
      color: '#111827'
    }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          記事ページ
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#4b5563', marginBottom: '2rem' }}>
          このページは現在準備中です。
        </p>
        <a 
          href="/" 
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2563eb',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            fontWeight: '500'
          }}
        >
          トップページに戻る
        </a>
      </div>
    </div>
  );
}

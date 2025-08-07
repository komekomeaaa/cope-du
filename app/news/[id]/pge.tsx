
// Cloudflareが要求する設定を追加します
export const runtime = 'edge';

// このページは実際には使われないので、中身はシンプルでOKです
export default function NewsPostPage() {
  return (
    <div>
      <p>This page is intentionally left blank to resolve a build issue.</p>
    </div>
  );
}

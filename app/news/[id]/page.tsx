import NewsArticle from "./NewsArticle"

// 静的エクスポート用のパス生成
export function generateStaticParams() {
  // デフォルトで1-20のIDを生成（管理画面で追加された記事も含む想定）
  return Array.from({ length: 20 }, (_, i) => ({
    id: (i + 1).toString(),
  }))
}

export default function NewsPostPage({ params }: { params: { id: string } }) {
  return <NewsArticle id={params.id} />
}

import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, User, ArrowLeft } from 'lucide-react'

// 静的エクスポート用：事前にすべてのニュースページを生成
export async function generateStaticParams() {
  // 初期ニュースデータを直接定義（インポートエラー回避）
  const newsIds = [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ]
  return newsIds
}

// ニュースデータを直接定義
const newsData = [
  {
    id: 1,
    title: "新サービス「AI Solutions Pro」をリリースしました",
    excerpt: "最新のAI技術を活用した業務効率化ソリューションの提供を開始いたします。",
    content: `
      <p>この度、弊社では最新のAI技術を活用した業務効率化ソリューション「AI Solutions Pro」の提供を開始いたしました。</p>
      
      <h3>サービスの特徴</h3>
      <ul>
        <li>機械学習による業務プロセスの自動化</li>
        <li>リアルタイムデータ分析とレポート生成</li>
        <li>直感的なユーザーインターフェース</li>
        <li>既存システムとの簡単な連携</li>
      </ul>
      
      <p>「AI Solutions Pro」は、企業の生産性向上と競争力強化を支援する包括的なソリューションです。導入により、従来の業務時間を最大60%削減することが可能になります。</p>
    `,
    date: "2024-01-15",
    category: "プレスリリース",
    author: "広報部",
    featured: true,
    status: 'published',
    image: "/ai-technology-office.png"
  },
  {
    id: 2,
    title: "東京本社オフィス移転のお知らせ",
    excerpt: "2024年3月より、東京本社を新宿区の新オフィスに移転いたします。",
    content: `
      <p>平素より格別のご高配を賜り、厚く御礼申し上げます。</p>
      <p>この度、弊社では事業拡大に伴い、東京本社を下記住所に移転することとなりましたのでお知らせいたします。</p>
      
      <h3>新住所</h3>
      <p>〒160-0023<br />東京都新宿区西新宿1-1-1 新宿ビル15F</p>
      
      <h3>移転日</h3>
      <p>2024年3月1日（金）</p>
      
      <p>新オフィスでは、より良い環境でお客様にサービスを提供できるよう努めてまいります。</p>
    `,
    date: "2024-01-10",
    category: "お知らせ",
    author: "総務部",
    featured: false,
    status: 'published',
    image: "/modern-office-building.png"
  },
  {
    id: 3,
    title: "年末年始休業のご案内",
    excerpt: "誠に勝手ながら、下記の期間を年末年始休業とさせていただきます。",
    content: `
      <p>平素は格別のご高配を賜り、厚く御礼申し上げます。</p>
      <p>誠に勝手ながら、弊社では下記の期間を年末年始休業とさせていただきます。</p>
      
      <h3>休業期間</h3>
      <p>2023年12月29日（金）〜 2024年1月3日（水）</p>
      
      <h3>営業開始日</h3>
      <p>2024年1月4日（木）より通常営業いたします。</p>
      
      <p>休業期間中にいただいたお問い合わせにつきましては、営業開始日以降に順次対応させていただきます。</p>
    `,
    date: "2023-12-20",
    category: "お知らせ",
    author: "総務部",
    featured: false,
    status: 'published',
    image: "/placeholder-napyt.png"
  }
]

export default function NewsPostPage({ params }: { params: { id: string } }) {
  const article = newsData.find(item => item.id === Number(params.id))

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-light text-gray-900 mb-4">記事が見つかりません</h1>
            <p className="text-gray-600 mb-8">お探しの記事は削除されたか、移動された可能性があります。</p>
            <Link href="/news">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                ニュース一覧に戻る
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <article className="pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/news">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              ニュース一覧に戻る
            </Button>
          </Link>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-blue-600 text-white">{article.category}</Badge>
              {article.featured && (
                <Badge variant="outline" className="border-orange-400 text-orange-600">
                  注目
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-6 text-gray-500">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {article.author}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          {article.image && (
            <div className="mb-12 rounded-2xl overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-light prose-p:text-gray-700 prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>

      <Footer />
    </div>
  )
}

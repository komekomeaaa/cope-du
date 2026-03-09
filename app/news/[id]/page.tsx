import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { seedNews } from "@/lib/news"

type Params = { id: string }

export const dynamicParams = false

export function generateStaticParams() {
  return seedNews.map((item) => ({ id: item.id.toString() }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const article = seedNews.find((item) => item.id === Number(params.id))

  if (!article) {
    return {
      title: "記事が見つかりません",
      robots: { index: false, follow: false },
    }
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/news/${article.id}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      url: `/news/${article.id}`,
      images: article.image ? [{ url: article.image }] : undefined,
    },
  }
}

export default function NewsPostPage({ params }: { params: Params }) {
  const article = seedNews.find((item) => item.id === Number(params.id))

  if (!article) {
    return (
      <div className="min-h-screen">
        <Header />
        <main id="main-content" className="pt-32 pb-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-light text-slate-900 mb-4 font-[family-name:var(--font-display)]">記事が見つかりません</h1>
            <p className="text-slate-500 mb-8">お探しの記事は削除されたか、移動された可能性があります。</p>
            <Link href="/news">
              <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-600/20">
                <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                ニュース一覧に戻る
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content">
        <article className="pt-32 pb-24 px-4">
          <div className="max-w-4xl mx-auto">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "NewsArticle",
                  headline: article.title,
                  datePublished: article.date,
                  dateModified: article.date,
                  author: {
                    "@type": "Organization",
                    name: article.author,
                  },
                }),
              }}
            />
            <Link href="/news">
              <Button variant="ghost" className="mb-8 text-slate-500 hover:text-slate-900 hover:bg-slate-100">
                <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                ニュース一覧に戻る
              </Button>
            </Link>

            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-cyan-600 text-white">{article.category}</Badge>
                {article.featured && (
                  <Badge variant="outline" className="border-amber-400 text-amber-600">
                    注目
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 text-balance font-[family-name:var(--font-display)]">{article.title}</h1>

              <div className="flex items-center gap-6 text-slate-400">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  {article.date}
                </span>
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" aria-hidden="true" />
                  {article.author}
                </span>
              </div>
            </header>

            {article.image && (
              <div className="mb-12 rounded-2xl overflow-hidden ring-1 ring-slate-200">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                  priority
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none prose-headings:font-light prose-headings:text-slate-900 prose-headings:font-[family-name:var(--font-display)] prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-cyan-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-strong:font-semibold prose-code:text-cyan-700 prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:border prose-pre:border-slate-200 prose-ul:list-disc prose-ol:list-decimal prose-li:text-slate-600">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

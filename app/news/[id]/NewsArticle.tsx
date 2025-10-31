'use client'

import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useNews } from "@/app/contexts/NewsContext"
import Link from "next/link"
import { Calendar, User, ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function NewsArticle({ id }: { id: string }) {
  const { news } = useNews()
  const article = news.find(item => item.id === Number(id))

  if (!article) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-32 pb-24 px-4 bg-white/30">
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
    <div className="min-h-screen">
      <Header />
      
      <article className="pt-32 pb-24 px-4 bg-white/30">
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
          <div className="prose prose-lg max-w-none prose-headings:font-light prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-semibold prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-ul:list-disc prose-ol:list-decimal prose-li:text-gray-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}


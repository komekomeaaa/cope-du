'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { useNews } from "../../contexts/NewsContext"

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const { news } = useNews()
  const newsItem = news.find(item => item.id === parseInt(params.id) && item.status === 'published')

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-4 text-gray-900">記事が見つかりません</h1>
            <p className="text-gray-600 mb-8">お探しの記事は存在しないか、現在公開されていません。</p>
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
      
      <div className="pt-32">
        <article className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link href="/news" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-300 group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              ニュース一覧に戻る
            </Link>

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Badge className={`${
                  newsItem.category === 'プレスリリース' ? 'bg-blue-600' :
                  newsItem.category === 'お知らせ' ? 'bg-green-600' :
                  newsItem.category === 'イベント' ? 'bg-purple-600' :
                  'bg-orange-600'
                } text-white rounded-full`}>
                  {newsItem.category}
                </Badge>
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {newsItem.date}
                </div>
                {newsItem.featured && (
                  <Badge className="bg-red-600 text-white rounded-full">
                    注目記事
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl font-light text-gray-900 mb-4 leading-tight">
                {newsItem.title}
              </h1>
              <p className="text-gray-600">投稿者: {newsItem.author}</p>
            </header>

            {/* Featured Image */}
            {newsItem.image && (
              <div className="mb-8">
                <Image
                  src={newsItem.image || "/placeholder.svg"}
                  alt={newsItem.title}
                  width={800}
                  height={400}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-8 font-light leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
            </div>

            {/* Share Buttons */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">この記事をシェア</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white rounded-full">
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white rounded-full">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white rounded-full">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <Footer />
    </div>
  )
}

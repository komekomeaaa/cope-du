'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Search, Filter, Sparkles } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { useNews } from "../contexts/NewsContext"

const categories = ["すべて", "プレスリリース", "お知らせ", "イベント", "採用"]

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("すべて")
  const { getPublishedNews } = useNews()
  
  const allNews = getPublishedNews()

  const filteredNews = allNews.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "すべて" || news.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-32">
        {/* Hero Section */}
        <section className="pb-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-r from-pink-200/30 to-yellow-200/30 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }} />
          
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-8 animate-pulse">
              <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-600">最新情報をお届け</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-8">
              ニュース
            </h1>
            <p className="text-xl text-gray-600 font-light">
              最新の会社情報、プレスリリース、イベント情報をお届けします
            </p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 px-4 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="ニュースを検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-blue-600 rounded-full"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`transition-all duration-300 rounded-full ${
                      selectedCategory === category 
                        ? 'bg-blue-600 hover:bg-blue-700 transform scale-105' 
                        : 'border-gray-300 hover:bg-gray-50 hover:scale-105'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((news, index) => (
                <Link key={news.id} href={`/news/${news.id}`}>
                  <Card className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-3 cursor-pointer h-full border border-gray-200 overflow-hidden ${
                    news.featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                  }`}>
                    <div className="relative overflow-hidden">
                      <Image
                        src={news.image || "/placeholder.svg"}
                        alt={news.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className={`absolute top-4 left-4 rounded-full group-hover:scale-110 transition-transform duration-300 ${
                        news.category === 'プレスリリース' ? 'bg-blue-600' :
                        news.category === 'お知らせ' ? 'bg-green-600' :
                        news.category === 'イベント' ? 'bg-purple-600' :
                        'bg-orange-600'
                      }`}>
                        {news.category}
                      </Badge>
                      {news.featured && (
                        <Badge className="absolute top-4 right-4 bg-red-600 rounded-full animate-pulse">
                          注目
                        </Badge>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardHeader className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        {news.date}
                      </div>
                      <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 text-lg">
                        {news.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <CardDescription className="line-clamp-3 font-light">
                        {news.excerpt}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">検索条件に一致するニュースが見つかりませんでした。</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

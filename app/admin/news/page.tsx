'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Plus, Edit, Trash2, Search, ArrowLeft, Eye } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useNews } from "../../contexts/NewsContext"

export default function AdminNewsPage() {
  const { news, updateNews, deleteNews } = useNews()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("すべて")
  const [selectedStatus, setSelectedStatus] = useState("すべて")
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    } else {
      router.push('/admin/login')
    }
  }, [router])

  const categories = ["すべて", "プレスリリース", "お知らせ", "イベント", "採用"]
  const statuses = ["すべて", "published", "draft"]

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "すべて" || item.category === selectedCategory
    const matchesStatus = selectedStatus === "すべて" || item.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleDelete = (id: number) => {
    if (confirm('この記事を削除しますか？')) {
      deleteNews(id)
    }
  }

  const toggleStatus = (id: number) => {
    const item = news.find(n => n.id === id)
    if (item) {
      updateNews(id, { status: item.status === 'published' ? 'draft' : 'published' })
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">認証を確認中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  ダッシュボード
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  記事管理
                </h1>
                <p className="text-gray-600">ニュース記事の作成・編集・削除</p>
              </div>
            </div>
            <Link href="/admin/news/create">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                新規記事作成
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-2 border-blue-100">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="記事を検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-blue-200 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40 border-blue-200">
                    <SelectValue placeholder="カテゴリー" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-32 border-blue-200">
                    <SelectValue placeholder="ステータス" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === 'すべて' ? 'すべて' : 
                         status === 'published' ? '公開中' : '下書き'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* News List */}
        <div className="space-y-4">
          {filteredNews.map((item) => (
            <Card key={item.id} className="bg-white/80 backdrop-blur-sm border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={`${
                        item.category === 'プレスリリース' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                        item.category === 'お知らせ' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                        item.category === 'イベント' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                        'bg-gradient-to-r from-orange-500 to-yellow-500'
                      } text-white`}>
                        {item.category}
                      </Badge>
                      <Badge variant={item.status === 'published' ? 'default' : 'secondary'} className={
                        item.status === 'published' 
                          ? 'bg-green-100 text-green-800 border-green-300' 
                          : 'bg-gray-100 text-gray-800 border-gray-300'
                      }>
                        {item.status === 'published' ? '公開中' : '下書き'}
                      </Badge>
                      {item.featured && (
                        <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                          注目
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {item.date} | {item.author}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-6">
                    {item.status === 'published' && (
                      <Link href={`/news/${item.id}`} target="_blank">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full border-green-300 text-green-600 hover:bg-green-50"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          表示
                        </Button>
                      </Link>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleStatus(item.id)}
                      className={`${
                        item.status === 'published' 
                          ? 'border-orange-300 text-orange-600 hover:bg-orange-50' 
                          : 'border-green-300 text-green-600 hover:bg-green-50'
                      }`}
                    >
                      {item.status === 'published' ? '非公開' : '公開'}
                    </Button>
                    <Link href={`/admin/news/edit/${item.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        編集
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(item.id)}
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      削除
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredNews.length === 0 && (
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-100">
              <CardContent className="py-12 text-center">
                <p className="text-gray-500 text-lg">検索条件に一致する記事が見つかりませんでした。</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

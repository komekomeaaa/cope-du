'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Plus, Edit, Trash2, Eye } from 'lucide-react'
import { Header } from "../components/header"
import { Footer } from "../components/footer"

interface NewsItem {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  author: string
  featured: boolean
}

const initialNews: NewsItem[] = [
  {
    id: 1,
    title: "新サービス「AI Solutions Pro」をリリースしました",
    excerpt: "最新のAI技術を活用した業務効率化ソリューションの提供を開始いたします。",
    content: "詳細なコンテンツがここに入ります...",
    date: "2024-01-15",
    category: "プレスリリース",
    author: "広報部",
    featured: true
  },
  {
    id: 2,
    title: "東京本社オフィス移転のお知らせ",
    excerpt: "2024年3月より、東京本社を新宿区の新オフィスに移転いたします。",
    content: "詳細なコンテンツがここに入ります...",
    date: "2024-01-10",
    category: "お知らせ",
    author: "総務部",
    featured: false
  }
]

export default function AdminPage() {
  const [news, setNews] = useState<NewsItem[]>(initialNews)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    featured: false
  })

  const categories = ["プレスリリース", "お知らせ", "イベント", "採用"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingId) {
      // 編集モード
      setNews(news.map(item => 
        item.id === editingId 
          ? { ...item, ...formData, date: new Date().toISOString().split('T')[0] }
          : item
      ))
    } else {
      // 新規作成モード
      const newItem: NewsItem = {
        id: Math.max(...news.map(n => n.id)) + 1,
        ...formData,
        date: new Date().toISOString().split('T')[0]
      }
      setNews([newItem, ...news])
    }

    // フォームリセット
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      author: '',
      featured: false
    })
    setIsEditing(false)
    setEditingId(null)
  }

  const handleEdit = (item: NewsItem) => {
    setFormData({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      category: item.category,
      author: item.author,
      featured: item.featured
    })
    setEditingId(item.id)
    setIsEditing(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('この記事を削除しますか？')) {
      setNews(news.filter(item => item.id !== id))
    }
  }

  const handleCancel = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      author: '',
      featured: false
    })
    setIsEditing(false)
    setEditingId(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20">
        {/* Header */}
        <section className="py-8 px-4 bg-white border-b">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">記事管理</h1>
                <p className="text-gray-600 mt-2">ニュース記事の作成・編集・削除ができます</p>
              </div>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  新規記事作成
                </Button>
              )}
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className={`transition-all duration-500 ${isEditing ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <Card>
                <CardHeader>
                  <CardTitle>{editingId ? '記事編集' : '新規記事作成'}</CardTitle>
                  <CardDescription>
                    記事の情報を入力してください
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">タイトル</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="記事のタイトルを入力"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="excerpt">概要</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                        placeholder="記事の概要を入力"
                        rows={3}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">本文</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        placeholder="記事の本文を入力"
                        rows={8}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">カテゴリー</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="カテゴリーを選択" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="author">投稿者</Label>
                        <Input
                          id="author"
                          value={formData.author}
                          onChange={(e) => setFormData({...formData, author: e.target.value})}
                          placeholder="投稿者名"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                        className="rounded"
                      />
                      <Label htmlFor="featured">注目記事として表示</Label>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        {editingId ? '更新' : '作成'}
                      </Button>
                      <Button type="button" variant="outline" onClick={handleCancel}>
                        キャンセル
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* News List Section */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>記事一覧</CardTitle>
                  <CardDescription>
                    現在公開中の記事一覧です
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {news.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={`${
                                item.category === 'プレスリリース' ? 'bg-blue-600' :
                                item.category === 'お知らせ' ? 'bg-green-600' :
                                item.category === 'イベント' ? 'bg-purple-600' :
                                'bg-orange-600'
                              }`}>
                                {item.category}
                              </Badge>
                              {item.featured && (
                                <Badge variant="destructive">注目</Badge>
                              )}
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {item.excerpt}
                            </p>
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              {item.date} | {item.author}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(item)}
                              className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, Save, Eye, Plus } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useNews } from "../../../contexts/NewsContext"

export default function CreateNewsPage() {
  const { addNews, categories, addCategory } = useNews()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    featured: false,
    status: 'draft' as 'draft' | 'published'
  })
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    } else {
      router.push('/admin/login')
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addNews(formData)
    router.push('/admin/news')
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      addCategory(newCategory.trim())
      setFormData(prev => ({ ...prev, category: newCategory.trim() }))
      setNewCategory('')
      setIsDialogOpen(false)
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
              <Link href="/admin/news">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  記事一覧
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  新規記事作成
                </h1>
                <p className="text-gray-600">新しいニュース記事を作成します</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                <Eye className="h-4 w-4 mr-2" />
                プレビュー
              </Button>
              <Button 
                form="news-form"
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                保存
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <form id="news-form" onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-100">
                <CardHeader>
                  <CardTitle className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    記事内容
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="text-gray-700 text-base font-medium">タイトル *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="記事のタイトルを入力"
                      className="border-blue-200 focus:border-blue-500 text-base h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt" className="text-gray-700 text-base font-medium">概要 *</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      placeholder="記事の概要を入力（150文字程度）"
                      rows={4}
                      className="border-blue-200 focus:border-blue-500 text-base"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="content" className="text-gray-700 text-base font-medium">本文 *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      placeholder="記事の本文を入力"
                      rows={20}
                      className="border-blue-200 focus:border-blue-500 text-base"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      HTMLタグを使用できます。例: &lt;h3&gt;見出し&lt;/h3&gt;, &lt;p&gt;段落&lt;/p&gt;, &lt;ul&gt;&lt;li&gt;リスト&lt;/li&gt;&lt;/ul&gt;
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish Settings */}
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-100">
                <CardHeader>
                  <CardTitle className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    公開設定
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="status" className="text-gray-700 font-medium">ステータス</Label>
                    <Select value={formData.status} onValueChange={(value: 'draft' | 'published') => handleInputChange('status', value)}>
                      <SelectTrigger className="border-blue-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">下書き</SelectItem>
                        <SelectItem value="published">公開</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleInputChange('featured', checked)}
                    />
                    <Label htmlFor="featured" className="text-gray-700 font-medium">注目記事として表示</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Article Settings */}
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-100">
                <CardHeader>
                  <CardTitle className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    記事設定
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="category" className="text-gray-700 font-medium">カテゴリー *</Label>
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-xs">
                            <Plus className="h-3 w-3 mr-1" />
                            追加
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>新しいカテゴリーを追加</DialogTitle>
                            <DialogDescription>
                              新しいカテゴリー名を入力してください
                            </DialogDescription>
                          </DialogHeader>
                          <Input
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="カテゴリー名"
                            className="border-blue-200 focus:border-blue-500"
                          />
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                              キャンセル
                            </Button>
                            <Button onClick={handleAddCategory} className="bg-blue-600 hover:bg-blue-700">
                              追加
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="border-blue-200">
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
                    <Label htmlFor="author" className="text-gray-700 font-medium">投稿者 *</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                      placeholder="投稿者名"
                      className="border-blue-200 focus:border-blue-500"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Image Upload */}
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-100">
                <CardHeader>
                  <CardTitle className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    アイキャッチ画像
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
                    <p className="text-gray-500 mb-2">画像をドラッグ&ドロップ</p>
                    <p className="text-sm text-gray-400">または</p>
                    <Button variant="outline" className="mt-2 border-blue-300 text-blue-600 hover:bg-blue-50">
                      ファイルを選択
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Help */}
              <Card className="bg-blue-50 border-2 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-medium text-blue-800 mb-2">記事作成のヒント</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• タイトルは具体的で分かりやすく</li>
                    <li>• 概要は記事の要点を簡潔に</li>
                    <li>• 本文にはHTMLタグが使用可能</li>
                    <li>• 注目記事は最大3件まで推奨</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

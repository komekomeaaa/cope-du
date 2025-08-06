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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Save, Eye, Trash2, Plus, Calendar, User, AlertTriangle } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useNews, NewsItem } from "../../../../contexts/NewsContext"

export default function EditNewsPage({ params }: { params: { id: string } }) {
  const { news, updateNews, deleteNews, categories, addCategory } = useNews()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [originalData, setOriginalData] = useState<NewsItem | null>(null)
  const [hasChanges, setHasChanges] = useState(false)
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
      return
    }

    // 記事データを取得
    const articleId = parseInt(params.id)
    const article = news.find(item => item.id === articleId)
    
    if (article) {
      const data = {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        author: article.author,
        featured: article.featured,
        status: article.status
      }
      setFormData(data)
      setOriginalData(article)
    }
    
    setIsLoading(false)
  }, [params.id, news, router])

  // 変更検知
  useEffect(() => {
    if (!originalData) return
    
    const hasChanged = 
      formData.title !== originalData.title ||
      formData.excerpt !== originalData.excerpt ||
      formData.content !== originalData.content ||
      formData.category !== originalData.category ||
      formData.author !== originalData.author ||
      formData.featured !== originalData.featured ||
      formData.status !== originalData.status

    setHasChanges(hasChanged)
  }, [formData, originalData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    try {
      const articleId = parseInt(params.id)
      updateNews(articleId, formData)
      
      // 成功メッセージを表示するために少し待機
      await new Promise(resolve => setTimeout(resolve, 500))
      
      router.push('/admin/news')
    } catch (error) {
      console.error('保存エラー:', error)
    } finally {
      setIsSaving(false)
    }
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

  const handleDelete = () => {
    const articleId = parseInt(params.id)
    deleteNews(articleId)
    router.push('/admin/news')
  }

  const handlePreview = () => {
    // プレビュー機能（新しいタブで記事を開く）
    if (originalData?.status === 'published') {
      window.open(`/news/${params.id}`, '_blank')
    } else {
      alert('下書き記事はプレビューできません。公開してからプレビューしてください。')
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">記事を読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!originalData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <header className="bg-white/90 backdrop-blur-sm border-b border-blue-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Link href="/admin/news">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  記事一覧
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-red-600">記事が見つかりません</h1>
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center py-20">
          <Card className="max-w-md">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">記事が見つかりません</h2>
              <p className="text-gray-600 mb-6">指定された記事は存在しないか、削除されている可能性があります。</p>
              <Link href="/admin/news">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  記事一覧に戻る
                </Button>
              </Link>
            </CardContent>
          </Card>
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
                  記事編集
                </h1>
                <p className="text-gray-600">記事「{originalData.title}」を編集中</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                onClick={handlePreview}
                className="border-green-300 text-green-600 hover:bg-green-50"
                disabled={originalData.status !== 'published'}
              >
                <Eye className="h-4 w-4 mr-2" />
                プレビュー
              </Button>
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4 mr-2" />
                    削除
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-red-600">記事を削除</DialogTitle>
                    <DialogDescription>
                      この操作は取り消せません。記事「{originalData.title}」を完全に削除しますか？
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                      キャンセル
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                      削除する
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button 
                form="news-form"
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                disabled={isSaving || !hasChanges}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? '保存中...' : '変更を保存'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 変更通知 */}
        {hasChanges && (
          <Alert className="mb-6 border-yellow-300 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              未保存の変更があります。ページを離れる前に保存してください。
            </AlertDescription>
          </Alert>
        )}

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
              {/* Article Info */}
              <Card className="bg-blue-50 border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-800">記事情報</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-blue-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    作成日: {originalData.date}
                  </div>
                  <div className="flex items-center text-sm text-blue-700">
                    <User className="h-4 w-4 mr-2" />
                    作成者: {originalData.author}
                  </div>
                  <div className="flex items-center text-sm text-blue-700">
                    <Eye className="h-4 w-4 mr-2" />
                    記事ID: {originalData.id}
                  </div>
                </CardContent>
              </Card>

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
                  {originalData.image && (
                    <div className="mb-4">
                      <img 
                        src={originalData.image || "/placeholder.svg"} 
                        alt="現在の画像" 
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <p className="text-sm text-gray-500 mt-2">現在の画像</p>
                    </div>
                  )}
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
                    <p className="text-gray-500 mb-2">新しい画像をアップロード</p>
                    <p className="text-sm text-gray-400">または</p>
                    <Button variant="outline" className="mt-2 border-blue-300 text-blue-600 hover:bg-blue-50">
                      ファイルを選択
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Help */}
              <Card className="bg-green-50 border-2 border-green-200">
                <CardContent className="p-4">
                  <h4 className="font-medium text-green-800 mb-2">編集のヒント</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 変更は自動保存されません</li>
                    <li>• プレビューは公開記事のみ可能</li>
                    <li>• 削除は取り消せません</li>
                    <li>• 下書きに戻すことも可能</li>
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

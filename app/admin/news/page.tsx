'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useNews } from "@/app/contexts/NewsContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, LogOut, Save, X, FileText, User, Calendar, Eye, EyeOff, Sparkles, ExternalLink } from 'lucide-react'
import { MarkdownEditor } from "@/app/components/MarkdownEditor"
import { ImageUpload } from "@/app/components/ImageUpload"

export default function AdminNewsPage() {
  const router = useRouter()
  const { news, addNews, updateNews, deleteNews, categories } = useNews()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminUsername, setAdminUsername] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'お知らせ',
    author: '広報部',
    featured: false,
    status: 'published' as 'published' | 'draft',
    image: ''
  })

  // noindex メタタグを追加
  useEffect(() => {
    const metaRobots = document.createElement('meta')
    metaRobots.name = 'robots'
    metaRobots.content = 'noindex, nofollow'
    document.head.appendChild(metaRobots)

    return () => {
      document.head.removeChild(metaRobots)
    }
  }, [])

  useEffect(() => {
    // 認証チェック（クライアントサイドのみ）
    if (typeof window !== 'undefined') {
      const authenticated = localStorage.getItem('adminAuthenticated')
      const username = localStorage.getItem('adminUsername')
      if (authenticated !== 'true') {
        router.push('/admin')
      } else {
        setIsAuthenticated(true)
        setAdminUsername(username || '')
      }
    }
  }, [router])

  // トースト通知の自動非表示
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminAuthenticated')
      localStorage.removeItem('adminUsername')
    }
    router.push('/admin')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingId) {
      updateNews(editingId, formData)
      showToast('ニュースを更新しました', 'success')
    } else {
      addNews(formData)
      showToast('ニュースを作成しました', 'success')
    }
    
    // フォームをリセット
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'お知らせ',
      author: '広報部',
      featured: false,
      status: 'published',
      image: ''
    })
    setIsEditing(false)
    setEditingId(null)
  }

  const handleEdit = (id: number) => {
    const newsItem = news.find(n => n.id === id)
    if (newsItem) {
      setFormData({
        title: newsItem.title,
        excerpt: newsItem.excerpt,
        content: newsItem.content,
        category: newsItem.category,
        author: newsItem.author,
        featured: newsItem.featured,
        status: newsItem.status,
        image: newsItem.image || ''
      })
      setEditingId(id)
      setIsEditing(true)
      
      // フォームエリアにスクロール
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleDelete = (id: number) => {
    const newsItem = news.find(n => n.id === id)
    if (confirm(`「${newsItem?.title}」を削除してもよろしいですか？\n\nこの操作は取り消せません。`)) {
      deleteNews(id)
      showToast('ニュースを削除しました', 'success')
    }
  }

  const handleCancel = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'お知らせ',
      author: '広報部',
      featured: false,
      status: 'published',
      image: ''
    })
    setIsEditing(false)
    setEditingId(null)
  }

  const publishedNews = news.filter(n => n.status === 'published')
  const draftNews = news.filter(n => n.status === 'draft')

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-4">
          <div className={`px-6 py-4 rounded-lg shadow-lg border ${
            toast.type === 'success' 
              ? 'bg-white text-gray-900 border-gray-200' 
              : 'bg-white text-gray-900 border-gray-200'
          }`}>
            <p className="font-medium flex items-center gap-2">
              {toast.type === 'success' ? (
                <span className="text-green-600">✓</span>
              ) : (
                <span className="text-red-600">✕</span>
              )}
              {toast.message}
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">ニュース管理</h1>
                {adminUsername && (
                  <p className="text-xs text-gray-500">
                    {adminUsername}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  公開 {publishedNews.length}
                </span>
                <span className="flex items-center gap-1.5 text-gray-400">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  下書き {draftNews.length}
                </span>
              </div>
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  サイトを表示
                </Button>
              </Link>
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                ログアウト
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form Section - 3列分 */}
          <div className="lg:col-span-3">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100 bg-gray-50">
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <Edit className="h-5 w-5" />
                      ニュースを編集
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      新規作成
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* タイトル */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                      タイトル
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="ニュースのタイトルを入力"
                      required
                      className="h-11"
                    />
                  </div>

                  {/* 概要 */}
                  <div className="space-y-2">
                    <Label htmlFor="excerpt" className="text-sm font-medium text-gray-700">
                      概要
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                      placeholder="ニュースの概要を入力（一覧ページに表示されます）"
                      rows={3}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* マークダウンエディタ */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      本文
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <MarkdownEditor
                      value={formData.content}
                      onChange={(value) => setFormData({...formData, content: value})}
                      label=""
                    />
                  </div>

                  {/* カテゴリーと著者 */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                        カテゴリー
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({...formData, category: value})}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="author" className="text-sm font-medium text-gray-700">
                        著者
                      </Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => setFormData({...formData, author: e.target.value})}
                        className="h-11"
                        placeholder="広報部"
                      />
                    </div>
                  </div>

                  {/* 画像アップロード */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      アイキャッチ画像
                    </Label>
                    <ImageUpload
                      value={formData.image}
                      onChange={(value) => setFormData({...formData, image: value})}
                      label=""
                    />
                  </div>

                  {/* オプション */}
                  <div className="space-y-3 pt-2">
                    <Label className="text-sm font-medium text-gray-700">オプション</Label>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                          className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-900 block">注目記事</span>
                          <span className="text-xs text-gray-500">一覧ページの上部に表示されます</span>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.status === 'published'}
                          onChange={(e) => setFormData({
                            ...formData, 
                            status: e.target.checked ? 'published' : 'draft'
                          })}
                          className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-900 block">公開する</span>
                          <span className="text-xs text-gray-500">チェックを外すと下書きとして保存されます</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* アクションボタン */}
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <Button
                      type="submit"
                      className="flex-1 bg-gray-900 hover:bg-gray-800 text-white h-12 font-medium shadow-sm"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingId ? '更新' : '作成'}
                    </Button>
                    {isEditing && (
                      <Button
                        type="button"
                        onClick={handleCancel}
                        variant="outline"
                        className="h-12 px-6"
                      >
                        <X className="h-4 w-4 mr-2" />
                        キャンセル
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* News List Section - 2列分 */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200 shadow-sm sticky top-24">
              <CardHeader className="border-b border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    ニュース一覧
                  </CardTitle>
                  <span className="text-sm text-gray-500">
                    {news.length}件
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                  {news.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 font-medium mb-1">ニュースがありません</p>
                      <p className="text-sm text-gray-400">左のフォームから作成してください</p>
                    </div>
                  ) : (
                    news.map((item) => (
                      <div
                        key={item.id}
                        className={`group relative p-4 border rounded-lg transition-all ${
                          editingId === item.id 
                            ? 'border-gray-900 bg-gray-50 shadow-sm' 
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                        }`}
                      >
                        {/* 画像サムネイル */}
                        {item.image && (
                          <div className="mb-3 rounded-md overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-full h-32 object-cover"
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          {/* バッジ */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className="bg-gray-900 text-white text-xs">
                              {item.category}
                            </Badge>
                            {item.featured && (
                              <Badge className="bg-gray-700 text-white text-xs">
                                注目
                              </Badge>
                            )}
                            {item.status === 'draft' && (
                              <Badge variant="outline" className="text-xs border-gray-300 text-gray-500">
                                下書き
                              </Badge>
                            )}
                          </div>

                          {/* タイトル */}
                          <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight">
                            {item.title}
                          </h3>

                          {/* 概要 */}
                          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                            {item.excerpt}
                          </p>

                          {/* メタ情報 */}
                          <div className="flex items-center gap-3 text-xs text-gray-400 pt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {item.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {item.author}
                            </span>
                          </div>
                        </div>

                        {/* アクションボタン */}
                        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                          <Button
                            onClick={() => handleEdit(item.id)}
                            variant="outline"
                            size="sm"
                            className="flex-1 h-9 text-xs hover:bg-gray-50"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            編集
                          </Button>
                          <Button
                            onClick={() => handleDelete(item.id)}
                            variant="outline"
                            size="sm"
                            className="flex-1 h-9 text-xs text-red-600 hover:bg-red-50 hover:border-red-200"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            削除
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

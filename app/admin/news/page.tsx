'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useNews } from "@/app/contexts/NewsContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, LogOut, Save, X, FileText, User, Calendar, Eye, EyeOff } from 'lucide-react'
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
    if (confirm(`「${newsItem?.title}」を削除してもよろしいですか？\nこの操作は取り消せません。`)) {
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
          <div className={`px-6 py-4 rounded-lg shadow-lg ${
            toast.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            <p className="font-medium">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">ニュース管理</h1>
                {adminUsername && (
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {adminUsername}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4 text-green-600" />
                  公開 {publishedNews.length}件
                </span>
                <span className="flex items-center gap-1">
                  <EyeOff className="h-4 w-4 text-gray-400" />
                  下書き {draftNews.length}件
                </span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200"
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
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <Edit className="h-6 w-6" />
                      ニュースを編集
                    </>
                  ) : (
                    <>
                      <Plus className="h-6 w-6" />
                      新しいニュースを作成
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* タイトル */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-base font-semibold text-gray-700 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      タイトル
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="例: 新製品のリリースについて"
                      required
                      className="text-lg border-2 focus:border-blue-500"
                    />
                  </div>

                  {/* 概要 */}
                  <div className="space-y-2">
                    <Label htmlFor="excerpt" className="text-base font-semibold text-gray-700">
                      概要
                      <span className="text-red-500">*</span>
                    </Label>
                    <textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                      placeholder="ニュースの概要を入力してください（一覧ページに表示されます）"
                      rows={3}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* マークダウンエディタ */}
                  <div>
                    <MarkdownEditor
                      value={formData.content}
                      onChange={(value) => setFormData({...formData, content: value})}
                      label="本文 *"
                    />
                  </div>

                  {/* カテゴリーと著者 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-base font-semibold text-gray-700">
                        カテゴリー
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({...formData, category: value})}
                      >
                        <SelectTrigger className="border-2">
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
                      <Label htmlFor="author" className="text-base font-semibold text-gray-700 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        著者
                      </Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => setFormData({...formData, author: e.target.value})}
                        className="border-2"
                      />
                    </div>
                  </div>

                  {/* 画像アップロード */}
                  <div>
                    <ImageUpload
                      value={formData.image}
                      onChange={(value) => setFormData({...formData, image: value})}
                      label="アイキャッチ画像（任意）"
                    />
                  </div>

                  {/* オプション */}
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold text-gray-700 mb-4">公開設定</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="flex items-center space-x-3 cursor-pointer p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">注目記事として表示</span>
                      </label>

                      <label className="flex items-center space-x-3 cursor-pointer p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.status === 'published'}
                          onChange={(e) => setFormData({
                            ...formData, 
                            status: e.target.checked ? 'published' : 'draft'
                          })}
                          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">すぐに公開する</span>
                      </label>
                    </div>
                  </div>

                  {/* アクションボタン */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      <Save className="h-5 w-5 mr-2" />
                      {editingId ? 'ニュースを更新' : 'ニュースを作成'}
                    </Button>
                    {isEditing && (
                      <Button
                        type="button"
                        onClick={handleCancel}
                        variant="outline"
                        className="px-8 rounded-full py-6 border-2 hover:bg-gray-100"
                      >
                        <X className="h-5 w-5 mr-2" />
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
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur sticky top-24">
              <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-t-lg">
                <CardTitle className="text-xl font-semibold">
                  ニュース一覧
                  <span className="ml-2 text-sm font-normal text-gray-300">
                    {news.length}件
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                  {news.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 font-medium mb-2">ニュースがまだありません</p>
                      <p className="text-sm text-gray-400">左のフォームから新しいニュースを作成してください</p>
                    </div>
                  ) : (
                    news.map((item) => (
                      <div
                        key={item.id}
                        className={`group relative p-4 border-2 rounded-xl transition-all hover:shadow-md ${
                          editingId === item.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 bg-white hover:border-blue-300'
                        }`}
                      >
                        {/* 画像サムネイル */}
                        {item.image && (
                          <div className="mb-3 rounded-lg overflow-hidden">
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
                            <Badge className="bg-blue-600 text-white text-xs font-medium">
                              {item.category}
                            </Badge>
                            {item.featured && (
                              <Badge className="bg-orange-500 text-white text-xs font-medium">
                                注目
                              </Badge>
                            )}
                            {item.status === 'draft' && (
                              <Badge variant="outline" className="text-xs border-gray-400 text-gray-600">
                                下書き
                              </Badge>
                            )}
                          </div>

                          {/* タイトル */}
                          <h3 className="font-semibold text-gray-900 line-clamp-2 text-base">
                            {item.title}
                          </h3>

                          {/* 概要 */}
                          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                            {item.excerpt}
                          </p>

                          {/* メタ情報 */}
                          <div className="flex items-center gap-3 text-xs text-gray-500">
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
                        <div className="flex gap-2 mt-4">
                          <Button
                            onClick={() => handleEdit(item.id)}
                            variant="outline"
                            size="sm"
                            className="flex-1 rounded-lg hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            編集
                          </Button>
                          <Button
                            onClick={() => handleDelete(item.id)}
                            variant="outline"
                            size="sm"
                            className="flex-1 rounded-lg text-red-600 hover:bg-red-50 hover:border-red-400"
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

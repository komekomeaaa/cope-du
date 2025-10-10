'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useNews } from "@/app/contexts/NewsContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, LogOut, Save, X, Download, Upload } from 'lucide-react'

export default function AdminNewsPage() {
  const router = useRouter()
  const { news, addNews, updateNews, deleteNews, categories, exportNews, importNews } = useNews()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminUsername, setAdminUsername] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  
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
    } else {
      addNews(formData)
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
    }
  }

  const handleDelete = (id: number) => {
    if (confirm('本当に削除しますか？')) {
      deleteNews(id)
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

  const handleExport = () => {
    exportNews()
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        if (importNews(content)) {
          alert('ニュースデータをインポートしました。')
        } else {
          alert('インポートに失敗しました。ファイル形式を確認してください。')
        }
      }
      reader.readAsText(file)
    }
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-600">読み込み中...</p>
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-medium text-gray-900">ニュース管理</h1>
              {adminUsername && (
                <p className="text-sm text-gray-500">ログイン: {adminUsername}</p>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleExport}
                variant="outline"
                className="rounded-full"
              >
                <Download className="h-4 w-4 mr-2" />
                エクスポート
              </Button>
              <label className="cursor-pointer">
                <Button
                  variant="outline"
                  className="rounded-full"
                  asChild
                >
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    インポート
                  </span>
                </Button>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="rounded-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                ログアウト
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-light">
                  {editingId ? 'ニュースを編集' : '新しいニュースを作成'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title">タイトル *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="ニュースのタイトル"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt">概要 *</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                      placeholder="ニュースの概要（一覧ページに表示されます）"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">本文 *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      placeholder="ニュースの本文（HTMLタグも使用できます）"
                      rows={8}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">カテゴリー</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({...formData, category: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="author">著者</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => setFormData({...formData, author: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image">画像URL（任意）</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      placeholder="/image-name.png"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">注目記事</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.status === 'published'}
                        onChange={(e) => setFormData({
                          ...formData, 
                          status: e.target.checked ? 'published' : 'draft'
                        })}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">公開する</span>
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingId ? '更新' : '作成'}
                    </Button>
                    {editingId && (
                      <Button
                        type="button"
                        onClick={handleCancel}
                        variant="outline"
                        className="rounded-full"
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

          {/* News List Section */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-light">
                  ニュース一覧 ({news.length}件)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[800px] overflow-y-auto">
                  {news.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                      ニュースがまだありません
                    </p>
                  ) : (
                    news.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-blue-600 text-white text-xs">
                                {item.category}
                              </Badge>
                              {item.featured && (
                                <Badge variant="outline" className="border-orange-400 text-orange-600 text-xs">
                                  注目
                                </Badge>
                              )}
                              {item.status === 'draft' && (
                                <Badge variant="outline" className="text-xs">
                                  下書き
                                </Badge>
                              )}
                            </div>
                            <h3 className="font-medium text-gray-900 mb-1">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {item.excerpt}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {item.date} | {item.author}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            onClick={() => handleEdit(item.id)}
                            variant="outline"
                            size="sm"
                            className="flex-1 rounded-full"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            編集
                          </Button>
                          <Button
                            onClick={() => handleDelete(item.id)}
                            variant="outline"
                            size="sm"
                            className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full"
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


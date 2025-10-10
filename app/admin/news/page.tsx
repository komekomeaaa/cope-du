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
      showToast('✅ ニュースを更新しました！', 'success')
    } else {
      addNews(formData)
      showToast('🎉 ニュースを作成しました！', 'success')
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
    if (confirm(`🗑️ 本当に削除しますか？\n\n「${newsItem?.title}」\n\n⚠️ この操作は取り消せません。\n削除してもいい場合は「OK」を押してください。`)) {
      deleteNews(id)
      showToast('✅ ニュースを削除しました', 'success')
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
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-4">
          <div className={`px-8 py-6 rounded-2xl shadow-2xl border-4 ${
            toast.type === 'success' 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-300' 
              : 'bg-gradient-to-r from-red-500 to-pink-600 text-white border-red-300'
          }`}>
            <p className="font-bold text-lg">{toast.message}</p>
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
                  {/* 手順説明 */}
                  {!isEditing && (
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                      <h3 className="font-bold text-blue-900 mb-3 text-lg flex items-center gap-2">
                        📝 記事の作り方（3ステップ）
                      </h3>
                      <ol className="space-y-2 text-sm text-blue-800">
                        <li className="flex items-start gap-2">
                          <span className="font-bold bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0">1</span>
                          <span><strong>タイトル</strong>と<strong>概要</strong>を書く</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0">2</span>
                          <span><strong>本文</strong>を書く（ボタンを押すと太字や見出しにできます）</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0">3</span>
                          <span>一番下の<strong>「ニュースを作成」</strong>ボタンを押す</span>
                        </li>
                      </ol>
                    </div>
                  )}

                  {/* タイトル */}
                  <div className="space-y-3">
                    <Label htmlFor="title" className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      📰 タイトル
                      <span className="text-red-500 text-base">（必ず書いてね！）</span>
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="例: 新しい商品が発売されます！"
                      required
                      className="text-lg border-2 focus:border-blue-500 py-6 px-4 rounded-xl"
                    />
                    <p className="text-sm text-gray-500">💡 このタイトルがニュース一覧に表示されます</p>
                  </div>

                  {/* 概要 */}
                  <div className="space-y-3">
                    <Label htmlFor="excerpt" className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      📋 かんたんな説明
                      <span className="text-red-500 text-base">（必ず書いてね！）</span>
                    </Label>
                    <textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                      placeholder="例: この記事では、新しい商品について紹介します。"
                      rows={3}
                      required
                      className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                    />
                    <p className="text-sm text-gray-500">💡 この説明がニュース一覧に表示されます（2〜3行くらいがちょうどいいよ）</p>
                  </div>

                  {/* マークダウンエディタ */}
                  <div className="space-y-3">
                    <Label className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      ✍️ くわしい内容を書こう
                      <span className="text-red-500 text-base">（必ず書いてね！）</span>
                    </Label>
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-yellow-900 font-medium mb-2">✨ ボタンの使い方</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-yellow-800">
                        <div>🔤 <strong>B</strong>: 太字</div>
                        <div>🔤 <strong>I</strong>: 斜体</div>
                        <div>📏 <strong>H1/H2/H3</strong>: 見出し</div>
                        <div>🔗 <strong>リンク</strong>: URLを入れる</div>
                        <div>🖼️ <strong>画像</strong>: 写真を入れる</div>
                        <div>👁️ <strong>プレビュー</strong>: 見た目を確認</div>
                      </div>
                    </div>
                    <MarkdownEditor
                      value={formData.content}
                      onChange={(value) => setFormData({...formData, content: value})}
                      label=""
                    />
                  </div>

                  {/* カテゴリーと著者 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="category" className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        🏷️ カテゴリー
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({...formData, category: value})}
                      >
                        <SelectTrigger className="border-2 py-6 text-base rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat} className="text-base">{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-500">💡 記事の種類を選んでね</p>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="author" className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        ✏️ 書いた人の名前
                      </Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => setFormData({...formData, author: e.target.value})}
                        className="border-2 py-6 text-base rounded-xl"
                        placeholder="例: 広報部"
                      />
                    </div>
                  </div>

                  {/* 画像アップロード */}
                  <div className="space-y-3">
                    <Label className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      🖼️ 記事の写真
                      <span className="text-gray-500 text-sm font-normal">（なくてもOK）</span>
                    </Label>
                    <ImageUpload
                      value={formData.image}
                      onChange={(value) => setFormData({...formData, image: value})}
                      label=""
                    />
                    <p className="text-sm text-gray-500">💡 写真をつけると、より目立つ記事になるよ！</p>
                  </div>

                  {/* オプション */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 space-y-4 border-2 border-purple-200">
                    <h3 className="font-bold text-purple-900 mb-4 text-lg flex items-center gap-2">
                      ⚙️ その他の設定
                    </h3>
                    <div className="space-y-4">
                      <label className="flex items-start space-x-4 cursor-pointer p-5 bg-white rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-md transition-all">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                          className="w-6 h-6 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mt-0.5 flex-shrink-0"
                        />
                        <div>
                          <span className="text-base font-bold text-gray-800 block">⭐ 注目記事にする</span>
                          <span className="text-sm text-gray-600">一覧ページで目立つように表示されます</span>
                        </div>
                      </label>

                      <label className="flex items-start space-x-4 cursor-pointer p-5 bg-white rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-md transition-all">
                        <input
                          type="checkbox"
                          checked={formData.status === 'published'}
                          onChange={(e) => setFormData({
                            ...formData, 
                            status: e.target.checked ? 'published' : 'draft'
                          })}
                          className="w-6 h-6 rounded border-gray-300 text-green-600 focus:ring-green-500 mt-0.5 flex-shrink-0"
                        />
                        <div>
                          <span className="text-base font-bold text-gray-800 block">🌐 すぐにウェブサイトに公開する</span>
                          <span className="text-sm text-gray-600">チェックを外すと「下書き」として保存されます</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* アクションボタン */}
                  <div className="bg-white rounded-xl p-6 border-2 border-dashed border-gray-300">
                    <div className="flex flex-col gap-4">
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl py-8 text-xl font-bold shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
                      >
                        <Save className="h-6 w-6 mr-3" />
                        {editingId ? '✅ 変更を保存する' : '🎉 ニュースを作成する'}
                      </Button>
                      {isEditing && (
                        <Button
                          type="button"
                          onClick={handleCancel}
                          variant="outline"
                          className="w-full rounded-2xl py-6 border-2 text-base hover:bg-gray-100"
                        >
                          <X className="h-5 w-5 mr-2" />
                          やめる（キャンセル）
                        </Button>
                      )}
                      <p className="text-sm text-center text-gray-500 mt-2">
                        {isEditing 
                          ? '💾 ボタンを押すと変更が保存されます' 
                          : '💾 ボタンを押すとニュースが作成されます'}
                      </p>
                    </div>
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
                    <div className="text-center py-16 px-4">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <FileText className="h-12 w-12 text-blue-500" />
                      </div>
                      <p className="text-xl font-bold text-gray-700 mb-3">📝 まだニュースがないよ</p>
                      <p className="text-base text-gray-500 mb-6">左側のフォームから<br />最初のニュースを作ってみよう！</p>
                      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 inline-block">
                        <p className="text-sm text-yellow-800">
                          👈 左のフォームに入力して<br />
                          「ニュースを作成する」ボタンを押してね
                        </p>
                      </div>
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
                        <div className="flex gap-3 mt-4">
                          <Button
                            onClick={() => handleEdit(item.id)}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3 font-bold shadow-md hover:shadow-lg transition-all"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            ✏️ 編集する
                          </Button>
                          <Button
                            onClick={() => handleDelete(item.id)}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 font-bold shadow-md hover:shadow-lg transition-all"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            🗑️ 削除
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

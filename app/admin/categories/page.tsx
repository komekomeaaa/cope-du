'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, Trash2, Tag } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useNews } from "../../contexts/NewsContext"

export default function CategoriesPage() {
  const { categories, addCategory, removeCategory, news } = useNews()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    } else {
      router.push('/admin/login')
    }
  }, [router])

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      addCategory(newCategory.trim())
      setNewCategory('')
    }
  }

  const handleRemoveCategory = (category: string) => {
    const isUsed = news.some(item => item.category === category)
    if (isUsed) {
      alert('このカテゴリーは記事で使用されているため削除できません。')
      return
    }
    
    if (confirm(`カテゴリー「${category}」を削除しますか？`)) {
      removeCategory(category)
    }
  }

  const getCategoryUsage = (category: string) => {
    return news.filter(item => item.category === category).length
  }

  const initialCategories = ["プレスリリース", "お知らせ", "イベント", "採用"]

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
                  カテゴリー管理
                </h1>
                <p className="text-gray-600">記事のカテゴリーを管理します</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Add Category */}
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                新しいカテゴリーを追加
              </CardTitle>
              <CardDescription>
                記事の分類に使用する新しいカテゴリーを作成できます
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddCategory} className="space-y-4">
                <div>
                  <Label htmlFor="category" className="text-gray-700 font-medium">カテゴリー名</Label>
                  <Input
                    id="category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="例: 技術情報"
                    className="border-blue-200 focus:border-blue-500"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  disabled={!newCategory.trim() || categories.includes(newCategory.trim())}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  カテゴリーを追加
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Category List */}
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                現在のカテゴリー
              </CardTitle>
              <CardDescription>
                登録されているカテゴリー一覧と使用状況
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categories.map((category) => {
                  const usage = getCategoryUsage(category)
                  const isDefault = initialCategories.includes(category)
                  
                  return (
                    <div key={category} className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Tag className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{category}</h3>
                          <p className="text-sm text-gray-600">
                            {usage}件の記事で使用中
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isDefault && (
                          <Badge variant="outline" className="border-green-300 text-green-600">
                            デフォルト
                          </Badge>
                        )}
                        <Badge variant="outline" className="border-blue-300 text-blue-600">
                          {usage}件
                        </Badge>
                        {!isDefault && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveCategory(category)}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                            disabled={usage > 0}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                })}
                
                {categories.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">カテゴリーがありません</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Info */}
        <Card className="mt-8 bg-blue-50 border-2 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-medium text-blue-800 mb-4">カテゴリー管理について</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <h4 className="font-medium mb-2">追加について</h4>
                <ul className="space-y-1">
                  <li>• 重複するカテゴリーは追加できません</li>
                  <li>• 日本語・英語・数字が使用可能です</li>
                  <li>• 記事作成時に選択できるようになります</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">削除について</h4>
                <ul className="space-y-1">
                  <li>• デフォルトカテゴリーは削除できません</li>
                  <li>• 使用中のカテゴリーは削除できません</li>
                  <li>• 削除前に該当記事の変更が必要です</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

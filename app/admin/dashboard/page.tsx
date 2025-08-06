'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, FileText, Settings, Plus, TrendingUp, Calendar, LogOut, Eye, Activity } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useNews } from "../../contexts/NewsContext"
import { AnimatedCounter } from "../../components/AnimatedCounter"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { getPublishedNews, getStats } = useNews()
  const router = useRouter()

  const stats = getStats()
  const recentNews = getPublishedNews().slice(0, 3)

  const dashboardStats = [
    { 
      title: '総記事数', 
      value: stats.totalNews, 
      icon: FileText, 
      color: 'from-blue-500 to-cyan-500',
      suffix: '件'
    },
    { 
      title: '月間PV', 
      value: stats.monthlyViews, 
      icon: TrendingUp, 
      color: 'from-purple-500 to-pink-500',
      suffix: ''
    },
    { 
      title: 'お問い合わせ', 
      value: stats.contacts, 
      icon: Users, 
      color: 'from-green-500 to-emerald-500',
      suffix: '件'
    },
    { 
      title: 'アクティブページ', 
      value: stats.activePages, 
      icon: Activity, 
      color: 'from-orange-500 to-yellow-500',
      suffix: 'ページ'
    }
  ]

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    } else {
      router.push('/admin/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin/login')
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
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CMS管理画面
              </h1>
              <p className="text-gray-600">TechCorp コンテンツ管理システム</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                  <Eye className="h-4 w-4 mr-2" />
                  サイトを見る
                </Button>
              </Link>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                ログアウト
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <div className="text-3xl font-bold text-gray-800">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-100">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  <AnimatedCounter end={stats.publishedNews} suffix="件" />
                </div>
                <p className="text-sm text-gray-600">公開中の記事</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-100">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-2">
                  <AnimatedCounter end={stats.draftNews} suffix="件" />
                </div>
                <p className="text-sm text-gray-600">下書き記事</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-100">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">
                  <AnimatedCounter end={stats.featuredNews} suffix="件" />
                </div>
                <p className="text-sm text-gray-600">注目記事</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  クイックアクション
                </CardTitle>
                <CardDescription>よく使用する機能へのショートカット</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/admin/news/create">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    新規記事作成
                  </Button>
                </Link>
                <Link href="/admin/news">
                  <Button variant="outline" className="w-full border-blue-300 text-blue-600 hover:bg-blue-50">
                    <FileText className="h-4 w-4 mr-2" />
                    記事管理
                  </Button>
                </Link>
                <Link href="/admin/contacts">
                  <Button variant="outline" className="w-full border-purple-300 text-purple-600 hover:bg-purple-50">
                    <Users className="h-4 w-4 mr-2" />
                    お問い合わせ管理
                  </Button>
                </Link>
                <Link href="/admin/categories">
                  <Button variant="outline" className="w-full border-green-300 text-green-600 hover:bg-green-50">
                    <Settings className="h-4 w-4 mr-2" />
                    カテゴリ管理
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Recent News */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-100">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      最近の記事
                    </CardTitle>
                    <CardDescription>最新の投稿記事一覧</CardDescription>
                  </div>
                  <Link href="/admin/news">
                    <Button variant="outline" size="sm" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                      すべて見る
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentNews.map((news) => (
                    <div key={news.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{news.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {news.date}
                          </span>
                          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {news.category}
                          </Badge>
                          {news.featured && (
                            <Badge className="bg-red-500 text-white">注目</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="border-green-300 text-green-600">
                          公開中
                        </Badge>
                        <Link href={`/admin/news/edit/${news.id}`}>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                            編集
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                  
                  {recentNews.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">公開中の記事がありません</p>
                      <Link href="/admin/news/create">
                        <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                          最初の記事を作成
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activity Feed */}
        <Card className="mt-8 bg-white/80 backdrop-blur-sm border-2 border-blue-100">
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              最近のアクティビティ
            </CardTitle>
            <CardDescription>システムの最新の活動履歴</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: `${stats.publishedNews}件の記事が公開中です`, time: '現在', type: 'success' },
                { action: `${stats.draftNews}件の下書きがあります`, time: '現在', type: 'info' },
                { action: `月間${stats.monthlyViews.toLocaleString()}PVを記録`, time: '今月', type: 'success' },
                { action: `${stats.contacts}件のお問い合わせを受信`, time: '今月', type: 'info' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-gray-800">{activity.action}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

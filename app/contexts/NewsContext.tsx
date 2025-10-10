'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface NewsItem {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  author: string
  featured: boolean
  status: 'published' | 'draft'
  image?: string
}

interface NewsContextType {
  news: NewsItem[]
  categories: string[]
  addNews: (news: Omit<NewsItem, 'id' | 'date'>) => void
  updateNews: (id: number, news: Partial<NewsItem>) => void
  deleteNews: (id: number) => void
  addCategory: (category: string) => void
  removeCategory: (category: string) => void
  getPublishedNews: () => NewsItem[]
  getFeaturedNews: () => NewsItem[]
  exportNews: () => void
  importNews: (data: string) => boolean
  getStats: () => {
    totalNews: number
    publishedNews: number
    draftNews: number
    featuredNews: number
    monthlyViews: number
    activePages: number
    contacts: number
  }
}

const NewsContext = createContext<NewsContextType | undefined>(undefined)

// 初期ニュースデータをエクスポート（静的生成用）
export const initialNews: NewsItem[] = [
  {
    id: 1,
    title: "新サービス「AI Solutions Pro」をリリースしました",
    excerpt: "最新のAI技術を活用した業務効率化ソリューションの提供を開始いたします。企業の生産性向上と競争力強化を支援します。",
    content: `
      <p>この度、弊社では最新のAI技術を活用した業務効率化ソリューション「AI Solutions Pro」の提供を開始いたしました。</p>
      
      <h3>サービスの特徴</h3>
      <ul>
        <li>機械学習による業務プロセスの自動化</li>
        <li>リアルタイムデータ分析とレポート生成</li>
        <li>直感的なユーザーインターフェース</li>
        <li>既存システムとの簡単な連携</li>
      </ul>
      
      <p>「AI Solutions Pro」は、企業の生産性向上と競争力強化を支援する包括的なソリューションです。導入により、従来の業務時間を最大60%削減することが可能になります。</p>
    `,
    date: "2024-01-15",
    category: "プレスリリース",
    author: "広報部",
    featured: true,
    status: 'published',
    image: "/ai-technology-office.png"
  },
  {
    id: 2,
    title: "東京本社オフィス移転のお知らせ",
    excerpt: "2024年3月より、東京本社を新宿区の新オフィスに移転いたします。より良い環境でサービス提供を継続いたします。",
    content: `
      <p>平素より格別のご高配を賜り、厚く御礼申し上げます。</p>
      <p>この度、弊社では事業拡大に伴い、東京本社を下記住所に移転することとなりましたのでお知らせいたします。</p>
      
      <h3>新住所</h3>
      <p>〒160-0023<br />東京都新宿区西新宿1-1-1 新宿ビル15F</p>
      
      <h3>移転日</h3>
      <p>2024年3月1日（金）</p>
      
      <p>新オフィスでは、より良い環境でお客様にサービスを提供できるよう努めてまいります。</p>
    `,
    date: "2024-01-10",
    category: "お知らせ",
    author: "総務部",
    featured: false,
    status: 'published',
    image: "/modern-office-building.png"
  },
  {
    id: 3,
    title: "年末年始休業のご案内",
    excerpt: "誠に勝手ながら、下記の期間を年末年始休業とさせていただきます。ご不便をおかけいたしますが、何卒ご了承ください。",
    content: `
      <p>平素は格別のご高配を賜り、厚く御礼申し上げます。</p>
      <p>誠に勝手ながら、弊社では下記の期間を年末年始休業とさせていただきます。</p>
      
      <h3>休業期間</h3>
      <p>2023年12月29日（金）〜 2024年1月3日（水）</p>
      
      <h3>営業開始日</h3>
      <p>2024年1月4日（木）より通常営業いたします。</p>
      
      <p>休業期間中にいただいたお問い合わせにつきましては、営業開始日以降に順次対応させていただきます。</p>
    `,
    date: "2023-12-20",
    category: "お知らせ",
    author: "総務部",
    featured: false,
    status: 'published',
    image: "/placeholder-napyt.png"
  }
]

const initialCategories = ["プレスリリース", "お知らせ", "イベント", "採用"]

export function NewsProvider({ children }: { children: ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [categories, setCategories] = useState<string[]>(initialCategories)

  useEffect(() => {
    // ローカルストレージから読み込み（クライアントサイドのみ）
    if (typeof window !== 'undefined') {
      const savedNews = localStorage.getItem('techcorp-news')
      if (savedNews) {
        try {
          setNews(JSON.parse(savedNews))
        } catch (e) {
          setNews(initialNews)
        }
      } else {
        setNews(initialNews)
      }
    } else {
      // サーバーサイド（ビルド時）
      setNews(initialNews)
    }
  }, [])

  useEffect(() => {
    // ローカルストレージに保存（クライアントサイドのみ）
    if (typeof window !== 'undefined' && news.length > 0) {
      localStorage.setItem('techcorp-news', JSON.stringify(news))
    }
  }, [news])

  const addNews = (newNews: Omit<NewsItem, 'id' | 'date'>) => {
    const id = Math.max(...news.map(n => n.id), 0) + 1
    const date = new Date().toISOString().split('T')[0]
    setNews(prev => [{ ...newNews, id, date }, ...prev])
  }

  const updateNews = (id: number, updatedNews: Partial<NewsItem>) => {
    setNews(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedNews } : item
    ))
  }

  const deleteNews = (id: number) => {
    setNews(prev => prev.filter(item => item.id !== id))
  }

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories(prev => [...prev, category])
    }
  }

  const removeCategory = (category: string) => {
    if (!initialCategories.includes(category)) {
      setCategories(prev => prev.filter(c => c !== category))
    }
  }

  const getPublishedNews = () => {
    return news.filter(item => item.status === 'published')
  }

  const getFeaturedNews = () => {
    return news.filter(item => item.status === 'published' && item.featured)
  }

  const exportNews = () => {
    if (typeof window !== 'undefined') {
      const dataStr = JSON.stringify(news, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `techcorp-news-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

  const importNews = (data: string): boolean => {
    try {
      const importedNews = JSON.parse(data)
      if (Array.isArray(importedNews)) {
        setNews(importedNews)
        return true
      }
      return false
    } catch (e) {
      return false
    }
  }

  const getStats = () => {
    const publishedNews = news.filter(n => n.status === 'published')
    return {
      totalNews: news.length,
      publishedNews: publishedNews.length,
      draftNews: news.filter(n => n.status === 'draft').length,
      featuredNews: news.filter(n => n.featured && n.status === 'published').length,
      monthlyViews: Math.floor(publishedNews.length * 1250 + Math.random() * 5000),
      activePages: Math.min(publishedNews.length + 5, 15),
      contacts: Math.floor(publishedNews.length * 2.5 + Math.random() * 20)
    }
  }

  return (
    <NewsContext.Provider value={{
      news,
      categories,
      addNews,
      updateNews,
      deleteNews,
      addCategory,
      removeCategory,
      getPublishedNews,
      getFeaturedNews,
      exportNews,
      importNews,
      getStats
    }}>
      {children}
    </NewsContext.Provider>
  )
}

export function useNews() {
  const context = useContext(NewsContext)
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider')
  }
  return context
}

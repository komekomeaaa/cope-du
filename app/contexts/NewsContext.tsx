'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { seedNews, type NewsItem } from '@/lib/news'

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
export const initialNews: NewsItem[] = seedNews

const initialCategories = ["プレスリリース", "お知らせ", "イベント", "採用"]

export function NewsProvider({ children }: { children: ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [categories, setCategories] = useState<string[]>(initialCategories)
  const [isLoaded, setIsLoaded] = useState(false)

  // APIからニュースデータを取得
  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch('/api/news', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          }
        })
        if (response.ok) {
          const data = await response.json()
          if (Array.isArray(data)) {
            setNews(data.length > 0 ? data : initialNews)
          } else {
            setNews(initialNews)
          }
        } else {
          setNews(initialNews)
        }
      } catch (error) {
        console.error('Failed to load news from API:', error)
        setNews(initialNews)
      } finally {
        setIsLoaded(true)
      }
    }

    loadNews()
  }, [])

  // ニュースが変更されたらAPIに保存（初回ロード後のみ）
  useEffect(() => {
    const saveNews = async () => {
      if (!isLoaded) return

      try {
        const response = await fetch('/api/news', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(news),
          cache: 'no-store',
        })
        
        const result = await response.json()
        
        if (result.success) {
          console.log('✅ News saved successfully to server')
        } else if (result.warning) {
          console.warn('⚠️ ' + result.warning)
        }
      } catch (error) {
        console.error('❌ Failed to save news to API:', error)
      }
    }

    saveNews()
  }, [news, isLoaded])

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

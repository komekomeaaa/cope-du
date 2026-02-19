import { NextRequest, NextResponse } from 'next/server'
import { seedNews } from '@/lib/news'

// 初期ニュースデータ
const initialNews = seedNews

// Cloudflare Workersランタイム用の設定
export const runtime = 'edge'

// GET: ニュースデータを取得
export async function GET(request: NextRequest) {
  try {
    // Cloudflare KVから取得（env.corporate、env.KV、env.NEWS_KVをチェック）
    const env = process.env as any
    const kvNamespace = env.corporate || env.KV || env.NEWS_KV
    
    if (kvNamespace) {
      console.log('✅ KV is available - reading from KV')
      const newsData = await kvNamespace.get('news', { type: 'json' })
      const news = newsData || initialNews
      
      console.log(`📰 Loaded ${Array.isArray(news) ? news.length : 0} news items from KV`)
      
      return NextResponse.json(news, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'X-Data-Source': 'cloudflare-kv',
        }
      })
    } else {
      console.warn('⚠️ KV is NOT available - using fallback')
      
      // public/data/news.jsonから読み込み（フォールバック）
      try {
        const response = await fetch(new URL('/data/news.json', request.url))
        if (response.ok) {
          const news = await response.json()
          console.log(`📰 Loaded ${news.length} news items from news.json (fallback)`)
          
          return NextResponse.json(news, {
            headers: {
              'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0',
              'X-Data-Source': 'static-file',
            }
          })
        }
      } catch (e) {
        console.log('❌ Failed to load news.json, using initial data')
      }
      
      console.log(`📰 Using ${initialNews.length} initial news items`)
      
      return NextResponse.json(initialNews, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'X-Data-Source': 'initial-data',
        }
      })
    }
  } catch (error) {
    console.error('❌ Error reading news data:', error)
    return NextResponse.json(initialNews, {
      headers: {
        'Cache-Control': 'no-store',
        'X-Data-Source': 'error-fallback',
      }
    })
  }
}

// HEAD: データソースの確認用
export async function HEAD(request: NextRequest) {
  const env = process.env as any
  const kvNamespace = env.corporate || env.KV || env.NEWS_KV
  const dataSource = kvNamespace ? 'cloudflare-kv' : 'initial-data'
  
  return new NextResponse(null, {
    headers: {
      'X-Data-Source': dataSource,
      'X-KV-Available': kvNamespace ? 'true' : 'false',
    }
  })
}

// POST: ニュースデータを保存
export async function POST(request: NextRequest) {
  try {
    const news = await request.json()
    const env = process.env as any
    const kvNamespace = env.corporate || env.KV || env.NEWS_KV
    
    console.log(`💾 Attempting to save ${Array.isArray(news) ? news.length : 0} news items`)
    
    if (kvNamespace) {
      // Cloudflare KVに保存
      await kvNamespace.put('news', JSON.stringify(news))
      console.log('✅ Successfully saved to Cloudflare KV')
      
      return NextResponse.json({ 
        success: true,
        message: 'Data saved to Cloudflare KV',
        storage: 'cloudflare-kv'
      }, {
        headers: {
          'Cache-Control': 'no-store',
        }
      })
    } else {
      // KVが利用できない場合の警告
      console.error('❌ KV is not available - data will NOT be persisted!')
      console.error('⚠️ Please configure Cloudflare KV binding in your Cloudflare Pages settings')
      
      return NextResponse.json({ 
        success: false,
        warning: 'Cloudflare KV is not configured. Data cannot be saved. Please set up KV namespace binding.',
        storage: 'none',
        requiresSetup: true
      }, {
        headers: {
          'Cache-Control': 'no-store',
        }
      })
    }
  } catch (error) {
    console.error('❌ Error saving news data:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save news',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

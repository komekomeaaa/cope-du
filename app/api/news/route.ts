import { NextRequest, NextResponse } from 'next/server'

// 初期ニュースデータ
const initialNews = [
  {
    id: 1,
    title: "新サービス「AI Solutions Pro」をリリースしました",
    excerpt: "最新のAI技術を活用した業務効率化ソリューションの提供を開始いたします。企業の生産性向上と競争力強化を支援します。",
    content: "\n      <p>この度、弊社では最新のAI技術を活用した業務効率化ソリューション「AI Solutions Pro」の提供を開始いたしました。</p>\n      \n      <h3>サービスの特徴</h3>\n      <ul>\n        <li>機械学習による業務プロセスの自動化</li>\n        <li>リアルタイムデータ分析とレポート生成</li>\n        <li>直感的なユーザーインターフェース</li>\n        <li>既存システムとの簡単な連携</li>\n      </ul>\n      \n      <p>「AI Solutions Pro」は、企業の生産性向上と競争力強化を支援する包括的なソリューションです。導入により、従来の業務時間を最大60%削減することが可能になります。</p>\n    ",
    date: "2024-01-15",
    category: "プレスリリース",
    author: "広報部",
    featured: true,
    status: "published",
    image: "/ai-technology-office.png"
  },
  {
    id: 2,
    title: "東京本社オフィス移転のお知らせ",
    excerpt: "2024年3月より、東京本社を新宿区の新オフィスに移転いたします。より良い環境でサービス提供を継続いたします。",
    content: "\n      <p>平素より格別のご高配を賜り、厚く御礼申し上げます。</p>\n      <p>この度、弊社では事業拡大に伴い、東京本社を下記住所に移転することとなりましたのでお知らせいたします。</p>\n      \n      <h3>新住所</h3>\n      <p>〒160-0023<br />東京都新宿区西新宿1-1-1 新宿ビル15F</p>\n      \n      <h3>移転日</h3>\n      <p>2024年3月1日（金）</p>\n      \n      <p>新オフィスでは、より良い環境でお客様にサービスを提供できるよう努めてまいります。</p>\n    ",
    date: "2024-01-10",
    category: "お知らせ",
    author: "総務部",
    featured: false,
    status: "published",
    image: "/modern-office-building.png"
  },
  {
    id: 3,
    title: "年末年始休業のご案内",
    excerpt: "誠に勝手ながら、下記の期間を年末年始休業とさせていただきます。ご不便をおかけいたしますが、何卒ご了承ください。",
    content: "\n      <p>平素は格別のご高配を賜り、厚く御礼申し上げます。</p>\n      <p>誠に勝手ながら、弊社では下記の期間を年末年始休業とさせていただきます。</p>\n      \n      <h3>休業期間</h3>\n      <p>2023年12月29日（金）〜 2024年1月3日（水）</p>\n      \n      <h3>営業開始日</h3>\n      <p>2024年1月4日（木）より通常営業いたします。</p>\n      \n      <p>休業期間中にいただいたお問い合わせにつきましては、営業開始日以降に順次対応させていただきます。</p>\n    ",
    date: "2023-12-20",
    category: "お知らせ",
    author: "総務部",
    featured: false,
    status: "published",
    image: "/placeholder-napyt.png"
  }
]

// Cloudflare Workersランタイム用の設定
export const runtime = 'edge'

// GET: ニュースデータを取得
export async function GET(request: NextRequest) {
  try {
    // Cloudflare KVから取得（環境変数経由）
    const env = process.env as any
    
    if (env.NEWS_KV) {
      // Cloudflare KVが利用可能な場合
      const newsData = await env.NEWS_KV.get('news', { type: 'json' })
      const news = newsData || initialNews
      
      return NextResponse.json(news, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      })
    } else {
      // ローカル開発環境またはKVが設定されていない場合
      // public/data/news.jsonから読み込み（開発環境用フォールバック）
      try {
        const response = await fetch(new URL('/data/news.json', request.url))
        if (response.ok) {
          const news = await response.json()
          return NextResponse.json(news, {
            headers: {
              'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0',
            }
          })
        }
      } catch (e) {
        console.log('Fallback to initial news data')
      }
      
      return NextResponse.json(initialNews, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      })
    }
  } catch (error) {
    console.error('Error reading news data:', error)
    return NextResponse.json(initialNews, {
      headers: {
        'Cache-Control': 'no-store',
      }
    })
  }
}

// POST: ニュースデータを保存
export async function POST(request: NextRequest) {
  try {
    const news = await request.json()
    const env = process.env as any
    
    if (env.NEWS_KV) {
      // Cloudflare KVに保存
      await env.NEWS_KV.put('news', JSON.stringify(news))
      
      return NextResponse.json({ success: true }, {
        headers: {
          'Cache-Control': 'no-store',
        }
      })
    } else {
      // ローカル開発環境の場合は警告を出す
      console.warn('NEWS_KV is not available. Data is not persisted.')
      
      return NextResponse.json({ 
        success: true,
        warning: 'Running in development mode. Data will not persist.'
      }, {
        headers: {
          'Cache-Control': 'no-store',
        }
      })
    }
  } catch (error) {
    console.error('Error writing news data:', error)
    return NextResponse.json({ success: false, error: 'Failed to save news' }, { status: 500 })
  }
}


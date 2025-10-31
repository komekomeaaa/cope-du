import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

// デバッグ用エンドポイント
export async function GET(request: NextRequest) {
  const env = process.env as any
  
  const debugInfo = {
    timestamp: new Date().toISOString(),
    kvAvailable: {
      corporate: !!env.corporate,
      KV: !!env.KV,
      NEWS_KV: !!env.NEWS_KV,
    },
    kvNamespace: env.corporate || env.KV || env.NEWS_KV ? 'available' : 'not-available',
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      // 利用可能な環境変数のキー（値は表示しない）
      availableKeys: Object.keys(process.env).filter(key => 
        key.includes('KV') || key.includes('CLOUDFLARE')
      ),
    },
    runtime: 'edge',
  }
  
  // KVが利用可能な場合、テスト読み込みを実行
  if (env.corporate || env.KV || env.NEWS_KV) {
    try {
      const kvNamespace = env.corporate || env.KV || env.NEWS_KV
      const testData = await kvNamespace.get('news', { type: 'json' })
      debugInfo['kvTest'] = {
        success: true,
        hasData: !!testData,
        itemCount: Array.isArray(testData) ? testData.length : 0,
      }
    } catch (error) {
      debugInfo['kvTest'] = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
  
  return NextResponse.json(debugInfo, {
    headers: {
      'Cache-Control': 'no-store',
    }
  })
}


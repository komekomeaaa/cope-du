import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const newsFilePath = path.join(process.cwd(), 'public', 'data', 'news.json')

// キャッシュを無効化
export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET: ニュースデータを取得
export async function GET() {
  try {
    const fileContents = await fs.readFile(newsFilePath, 'utf8')
    const news = JSON.parse(fileContents)
    
    // キャッシュを無効化するヘッダーを追加
    return NextResponse.json(news, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    })
  } catch (error) {
    console.error('Error reading news data:', error)
    return NextResponse.json([], { status: 500 })
  }
}

// POST: ニュースデータを保存
export async function POST(request: NextRequest) {
  try {
    const news = await request.json()
    await fs.writeFile(newsFilePath, JSON.stringify(news, null, 2), 'utf8')
    
    return NextResponse.json({ success: true }, {
      headers: {
        'Cache-Control': 'no-store',
      }
    })
  } catch (error) {
    console.error('Error writing news data:', error)
    return NextResponse.json({ success: false, error: 'Failed to save news' }, { status: 500 })
  }
}


import { NextResponse } from 'next/server'

export const runtime = 'edge' // Cloudflare Workers対応

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // データのバリデーション
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      )
    }

    // メールアドレスの簡易バリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください' },
        { status: 400 }
      )
    }

    // TODO: 実際のメール送信処理やデータベース保存をここに追加
    // 例：
    // - Cloudflare Email Routingを使用
    // - SendGridやResendなどのサービスを使用
    // - Cloudflare D1やKVにデータを保存

    console.log('お問い合わせを受信しました:', data)

    // 成功レスポンス
    return NextResponse.json(
      { 
        success: true, 
        message: 'お問い合わせを受け付けました。24時間以内にご返信いたします。' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('エラーが発生しました:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました。しばらくしてから再度お試しください。' },
      { status: 500 }
    )
  }
}


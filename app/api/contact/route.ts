import { NextResponse } from "next/server"
import { contactSchema } from "@/lib/contact/schema"

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const parsed = contactSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "入力内容を確認してください",
          errors: parsed.error.flatten(),
        },
        { status: 400 }
      )
    }

    if (parsed.data.website && parsed.data.website.trim().length > 0) {
      return NextResponse.json({ success: true, message: "送信を受け付けました" })
    }

    const startedAt = Number(parsed.data.startedAt)
    if (Number.isFinite(startedAt) && Date.now() - startedAt < 1500) {
      return NextResponse.json(
        {
          success: false,
          message: "送信が早すぎます。入力内容をご確認のうえ、もう一度お試しください。",
        },
        { status: 429 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "お問い合わせありがとうございます。内容を確認し、担当者からご連絡します。",
      integrationStatus: "pending-kintone",
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "送信に失敗しました。時間をおいて再度お試しください。",
      },
      { status: 500 }
    )
  }
}

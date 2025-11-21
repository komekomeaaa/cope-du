'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from 'lucide-react'
import { Header } from "../components/header"
import { Footer } from "../components/footer"

import { siteConfig } from "@/config/site"

export default function ContactPage() {
  // 設定ファイルから読み込み
  const embedUrl = siteConfig.contactForm.embedUrl
  const useEmbedForm = siteConfig.contactForm.useEmbedForm

  return (
    <div className="min-h-screen">
      <Header />

      <div className="pt-32">
        {/* Hero Section */}
        <section className="pb-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-gray-900 mb-8 tracking-tight">
              お問い合わせ
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-normal mx-auto leading-loose">
              プロジェクトのご相談から技術的なお悩みまで、お気軽にご連絡ください
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 pb-24">
          {/* Contact Form */}
          <Card className="border-0 shadow-lg overflow-hidden bg-white/80 backdrop-blur-lg">
            <CardHeader className="p-8 sm:p-10 bg-gradient-to-br from-blue-50/70 to-white/70 backdrop-blur-sm border-b border-blue-200/60">
              <CardTitle className="text-2xl sm:text-3xl font-medium text-gray-900">お問い合わせフォーム</CardTitle>
              <CardDescription className="text-gray-700 font-normal text-base sm:text-lg mt-3">
                以下のフォームにご記入いただき、24
                時間以内にご返信いたします。
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 bg-white/60 backdrop-blur-sm">
              {useEmbedForm && embedUrl ? (
                // 埋め込みフォーム表示
                <div className="w-full relative overflow-hidden bg-white/80">
                  <iframe
                    src={embedUrl}
                    width="100%"
                    height="700"
                    frameBorder="0"
                    allowFullScreen
                    className="w-full min-h-[700px] bg-transparent"
                    style={{
                      marginTop: '-60px',
                      marginBottom: '-60px',
                      colorScheme: 'light'
                    }}
                  >
                    読み込んでいます...
                  </iframe>
                  {/* Notionコントロールバーを隠すオーバーレイ */}
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/90 to-transparent pointer-events-none z-10"></div>
                </div>
              ) : (
                // デフォルトのメッセージ（URLを設定してください）
                <div className="p-12 text-center">
                  <div className="max-w-md mx-auto space-y-6">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                      <Mail className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      フォームを設定してください
                    </h3>
                    <p className="text-gray-700 font-normal leading-relaxed">
                      お問い合わせフォームの埋め込みURLを<br />
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/contact/page.tsx</code><br />
                      の<code className="bg-gray-100 px-2 py-1 rounded text-sm">embedUrl</code>に設定してください。
                    </p>
                    <div className="pt-4">
                      <p className="text-sm text-gray-500 font-light">
                        対応サービス：Google Forms, Typeform, HubSpot, Formspree など
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}

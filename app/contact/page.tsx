'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
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
      
      <div className="pt-32 bg-white/30 backdrop-blur-sm">
        {/* Hero Section */}
        <section className="pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-8">
              お問い合わせ
            </h1>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
              プロジェクトのご相談から技術的なお悩みまで、お気軽にご連絡ください
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 pb-24">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-white">
                  <CardTitle className="text-2xl sm:text-3xl font-light text-gray-900">お問い合わせフォーム</CardTitle>
                  <CardDescription className="text-gray-600 font-light text-sm sm:text-base mt-2">
                    以下のフォームにご記入いただき、送信してください。24時間以内にご返信いたします。
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 bg-white">
                  {useEmbedForm && embedUrl ? (
                    // 埋め込みフォーム表示
                    <div className="w-full relative overflow-hidden bg-white">
                      <iframe
                        src={embedUrl}
                        width="100%"
                        height="700"
                        frameBorder="0"
                        allowFullScreen
                        className="w-full min-h-[700px] bg-white"
                        style={{
                          marginTop: '-60px',
                          marginBottom: '-60px',
                          colorScheme: 'light'
                        }}
                      >
                        読み込んでいます...
                      </iframe>
                      {/* Notionコントロールバーを隠すオーバーレイ */}
                      <div className="absolute top-0 left-0 right-0 h-16 bg-white pointer-events-none z-10"></div>
                    </div>
                  ) : (
                    // デフォルトのメッセージ（URLを設定してください）
                    <div className="p-12 text-center">
                      <div className="max-w-md mx-auto space-y-6">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                          <Mail className="h-10 w-10 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-normal text-gray-900">
                          フォームを設定してください
                        </h3>
                        <p className="text-gray-600 font-light leading-relaxed">
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

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card className="border border-gray-200">
                <CardHeader className="p-6">
                  <CardTitle className="text-xl font-medium text-gray-900">お問い合わせ先</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">電話</h3>
                      <p className="text-gray-700">{siteConfig.contact.phone}</p>
                      <p className="text-sm text-gray-500">{siteConfig.contact.businessHours.weekday.split(': ')[1]}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">メール</h3>
                      <p className="text-gray-700">{siteConfig.contact.email}</p>
                      <p className="text-sm text-gray-500">24時間受付</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">住所</h3>
                      <p className="text-gray-700">
                        {siteConfig.contact.address.postalCode}<br />
                        {siteConfig.contact.address.prefecture}{siteConfig.contact.address.city}<br />
                        {siteConfig.contact.address.building}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">営業時間</h3>
                      <p className="text-gray-700">
                        {siteConfig.contact.businessHours.weekday}<br />
                        {siteConfig.contact.businessHours.weekend}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

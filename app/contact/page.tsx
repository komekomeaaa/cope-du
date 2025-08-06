'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { Header } from "../components/header"
import { Footer } from "../components/footer"

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-32">
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
              <Card className="border border-gray-200">
                <CardHeader className="p-8">
                  <CardTitle className="text-2xl font-light text-gray-900">お問い合わせフォーム</CardTitle>
                  <CardDescription className="text-gray-600 font-light">
                    以下のフォームにご記入いただき、送信してください。24時間以内にご返信いたします。
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-medium text-gray-900 mb-2">送信完了</h3>
                      <p className="text-gray-600 font-light">
                        お問い合わせありがとうございます。<br />
                        24時間以内にご返信いたします。
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name" className="text-gray-700 font-medium">お名前 *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="border-gray-300 focus:border-blue-600 rounded-lg"
                            placeholder="山田 太郎"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-gray-700 font-medium">メールアドレス *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="border-gray-300 focus:border-blue-600 rounded-lg"
                            placeholder="example@company.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="company" className="text-gray-700 font-medium">会社名</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            className="border-gray-300 focus:border-blue-600 rounded-lg"
                            placeholder="株式会社サンプル"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-gray-700 font-medium">電話番号</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="border-gray-300 focus:border-blue-600 rounded-lg"
                            placeholder="03-1234-5678"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="service" className="text-gray-700 font-medium">ご興味のあるサービス</Label>
                          <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                            <SelectTrigger className="border-gray-300 focus:border-blue-600 rounded-lg">
                              <SelectValue placeholder="サービスを選択" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ai">AI・機械学習ソリューション</SelectItem>
                              <SelectItem value="cloud">クラウドインフラ構築</SelectItem>
                              <SelectItem value="mobile">モバイルアプリ開発</SelectItem>
                              <SelectItem value="data">データ分析・BI</SelectItem>
                              <SelectItem value="security">サイバーセキュリティ</SelectItem>
                              <SelectItem value="marketing">デジタルマーケティング</SelectItem>
                              <SelectItem value="other">その他</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="budget" className="text-gray-700 font-medium">予算規模</Label>
                          <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                            <SelectTrigger className="border-gray-300 focus:border-blue-600 rounded-lg">
                              <SelectValue placeholder="予算を選択" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-1m">100万円未満</SelectItem>
                              <SelectItem value="1m-5m">100万円〜500万円</SelectItem>
                              <SelectItem value="5m-10m">500万円〜1000万円</SelectItem>
                              <SelectItem value="over-10m">1000万円以上</SelectItem>
                              <SelectItem value="undecided">未定</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-gray-700 font-medium">お問い合わせ内容 *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className="border-gray-300 focus:border-blue-600 rounded-lg min-h-32"
                          placeholder="プロジェクトの詳細、ご要望、ご質問などをお聞かせください"
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium rounded-full"
                      >
                        <Send className="h-5 w-5 mr-2" />
                        送信する
                      </Button>
                    </form>
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
                      <p className="text-gray-700">03-1234-5678</p>
                      <p className="text-sm text-gray-500">平日 9:00-18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">メール</h3>
                      <p className="text-gray-700">info@techcorp.com</p>
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
                        〒160-0023<br />
                        東京都新宿区西新宿1-1-1<br />
                        新宿ビル10F
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
                        平日: 9:00 - 18:00<br />
                        土日祝: 休業
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Response */}
              <Card className="bg-blue-50 border border-blue-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">迅速な対応をお約束</h3>
                    <p className="text-gray-600 text-sm mb-4 font-light">
                      お問い合わせいただいた内容には、
                      24時間以内にご返信いたします。
                    </p>
                    <div className="flex justify-center space-x-4 text-sm text-gray-600">
                      <span>✓ 無料相談</span>
                      <span>✓ 秘密保持</span>
                      <span>✓ 迅速対応</span>
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

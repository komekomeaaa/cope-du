'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Building2, Users, Target, TrendingUp, Calendar, ChevronRight, Sparkles } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { useNews } from "./contexts/NewsContext"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { getPublishedNews } = useNews()
  
  const newsData = getPublishedNews().slice(0, 3)

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const services = [
    {
      icon: Building2,
      title: "システム開発",
      description: "最新技術を活用したWebアプリケーション・モバイルアプリの開発",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "コンサルティング",
      description: "DX推進・業務効率化に向けた戦略的なコンサルティングサービス",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Target,
      title: "マーケティング支援",
      description: "デジタルマーケティングによる売上向上・ブランディング支援",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "データ分析",
      description: "ビッグデータ解析・AI活用による意思決定支援サービス",
      color: "from-orange-500 to-yellow-500"
    }
  ]

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-pink-200/20 to-yellow-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-green-200/20 to-blue-200/20 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '3s' }} />
      </div>

      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-8 animate-pulse">
              <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-600">革新的なテクノロジーソリューション</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-8 leading-tight">
              <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>未来を創る</span>
              <br />
              <span className="inline-block font-normal bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                テクノロジー
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              革新的なソリューションで、お客様のビジネスを次のステージへ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <Link href="/services">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transform hover:scale-105 transition-all duration-300 hover:shadow-lg group">
                  サービス詳細
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-full font-medium transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                  お問い合わせ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 bg-gray-50 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="relative group">
                <Image
                  src="/modern-tech-office-team.png"
                  alt="Company"
                  width={600}
                  height={400}
                  className="rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h2 className="text-4xl font-light text-gray-900 mb-8">革新的なソリューション</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">
                私たちは、AI・機械学習、クラウドコンピューティング、
                IoTなどの最先端技術を活用し、お客様のビジネスに
                真の価値をもたらすソリューションを提供しています。
              </p>
              <div className="space-y-4">
                {[
                  "15年以上の豊富な実績",
                  "500社以上のお客様との取引実績",
                  "24時間365日のサポート体制"
                ].map((item, index) => (
                  <div key={index} className="flex items-center group">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors duration-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">サービス</h2>
            <p className="text-xl text-gray-600 font-light">
              お客様のニーズに合わせた幅広いサービスを提供しています
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`group text-center p-8 hover:bg-white rounded-2xl transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 group-hover:rotate-12`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 px-4 bg-gray-50 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl font-light text-gray-900 mb-4">最新ニュース</h2>
              <p className="text-xl text-gray-600 font-light">会社の最新情報をお届けします</p>
            </div>
            <Link href="/news">
              <Button variant="outline" className="group border-gray-300 text-gray-700 hover:bg-gray-100 rounded-full transform hover:scale-105 transition-all duration-300">
                すべて見る
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {newsData.map((news, index) => (
              <Link key={news.id} href={`/news/${news.id}`}>
                <div 
                  className={`group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={news.image || "/placeholder.svg"}
                      alt={news.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-blue-600 text-white rounded-full group-hover:scale-110 transition-transform duration-300">
                      {news.category}
                    </Badge>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      {news.date}
                    </div>
                    <h3 className="font-medium text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 font-light">
                      {news.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {newsData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">現在公開中のニュースはありません。</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl font-light text-gray-900 mb-8">お気軽にお問い合わせください</h2>
          <p className="text-xl text-gray-600 mb-12 font-light">
            プロジェクトのご相談から、技術的なお悩みまで、
            専門スタッフがサポートいたします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                無料相談を申し込む
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-full font-medium transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
              資料をダウンロード
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

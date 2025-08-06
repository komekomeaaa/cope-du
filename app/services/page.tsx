'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Cpu, Database, Cloud, Smartphone, BarChart3, Shield } from 'lucide-react'
import { Header } from "../components/header"
import { Footer } from "../components/footer"

const services = [
  {
    id: 1,
    icon: Cpu,
    title: "AI・機械学習ソリューション",
    description: "最先端のAI技術を活用した業務自動化・予測分析システムの開発",
    features: ["自然言語処理", "画像認識", "予測分析", "チャットボット開発"],
    price: "月額 ¥500,000〜",
    popular: true
  },
  {
    id: 2,
    icon: Cloud,
    title: "クラウドインフラ構築",
    description: "AWS・Azure・GCPを活用したスケーラブルなクラウド環境の設計・構築",
    features: ["マイクロサービス設計", "DevOps導入", "セキュリティ強化", "コスト最適化"],
    price: "月額 ¥300,000〜"
  },
  {
    id: 3,
    icon: Smartphone,
    title: "モバイルアプリ開発",
    description: "iOS・Android対応のネイティブ・クロスプラットフォームアプリ開発",
    features: ["React Native", "Flutter", "Swift/Kotlin", "UI/UX設計"],
    price: "¥2,000,000〜"
  },
  {
    id: 4,
    icon: Database,
    title: "データ分析・BI",
    description: "ビッグデータ解析とビジネスインテリジェンスによる意思決定支援",
    features: ["データウェアハウス", "リアルタイム分析", "ダッシュボード", "レポート自動化"],
    price: "月額 ¥400,000〜"
  },
  {
    id: 5,
    icon: Shield,
    title: "サイバーセキュリティ",
    description: "包括的なセキュリティ対策とリスク管理ソリューション",
    features: ["脆弱性診断", "侵入検知", "セキュリティ監視", "インシデント対応"],
    price: "月額 ¥200,000〜"
  },
  {
    id: 6,
    icon: BarChart3,
    title: "デジタルマーケティング",
    description: "データドリブンなマーケティング戦略とROI最大化支援",
    features: ["SEO/SEM", "SNS運用", "MA導入", "効果測定"],
    price: "月額 ¥150,000〜"
  }
]

export default function ServicesPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedService, setSelectedService] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-32">
        {/* Hero Section */}
        <section className="pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-8">
                サービス
              </h1>
              <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
                最先端テクノロジーで、あなたのビジネスを未来へ導きます
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="pb-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card 
                  key={service.id}
                  className={`group relative bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden ${
                    service.popular ? 'ring-2 ring-blue-600' : ''
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                >
                  {service.popular && (
                    <Badge className="absolute top-4 right-4 bg-blue-600 text-white rounded-full">
                      人気
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center p-8">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                      <service.icon className="h-8 w-8 text-gray-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-xl font-medium text-gray-900 mb-4">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 font-light leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="px-8 pb-8">
                    <div className="text-center mb-6">
                      <span className="text-2xl font-medium text-blue-600">{service.price}</span>
                    </div>
                    
                    <div className={`transition-all duration-500 overflow-hidden ${
                      selectedService === service.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="border-t border-gray-200 pt-6">
                        <h4 className="text-gray-900 font-medium mb-4">主な機能:</h4>
                        <ul className="space-y-2 mb-6">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="text-gray-600 text-sm flex items-center font-light">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                          詳細を見る
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-gray-900 mb-6">開発プロセス</h2>
              <p className="text-xl text-gray-600 font-light">確実な成果をお約束する、私たちの開発フロー</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "要件定義", desc: "お客様のニーズを詳細にヒアリング" },
                { step: "02", title: "設計・提案", desc: "最適なソリューションを設計・提案" },
                { step: "03", title: "開発・実装", desc: "アジャイル手法による迅速な開発" },
                { step: "04", title: "運用・保守", desc: "継続的なサポートと改善" }
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 mx-auto bg-blue-600 rounded-full flex items-center justify-center text-2xl font-medium text-white">
                      {process.step}
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-300"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">{process.title}</h3>
                  <p className="text-gray-600 font-light">{process.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

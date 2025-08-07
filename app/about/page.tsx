'use client'


import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Award, Globe, Zap, Heart, Lightbulb, Shield } from 'lucide-react'
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import Image from "next/image"

const stats = [
  { number: "15+", label: "年の実績", icon: Award },
  { number: "500+", label: "プロジェクト完了", icon: Target },
  { number: "50+", label: "専門エンジニア", icon: Users },
  { number: "24/7", label: "サポート体制", icon: Shield }
]

const values = [
  {
    icon: Lightbulb,
    title: "革新性",
    description: "常に最新技術を追求し、革新的なソリューションを提供します"
  },
  {
    icon: Heart,
    title: "顧客第一",
    description: "お客様の成功が私たちの成功。真のパートナーシップを築きます"
  },
  {
    icon: Zap,
    title: "スピード",
    description: "迅速な対応と効率的な開発で、市場投入時間を短縮します"
  },
  {
    icon: Globe,
    title: "グローバル",
    description: "世界基準の品質とサービスを、日本のお客様に提供します"
  }
]

const team = [
  {
    name: "田中 太郎",
    position: "CEO / Founder",
    image: "/ceo-portrait-professional.png",
    description: "15年以上のIT業界経験を持つ、テクノロジーとビジネスの架け橋"
  },
  {
    name: "佐藤 花子",
    position: "CTO",
    image: "/cto-female-tech-leader.png",
    description: "AI・機械学習分野のエキスパート。多数の特許を保有"
  },
  {
    name: "山田 次郎",
    position: "VP of Engineering",
    image: "/vp-engineering-portrait.png",
    description: "大規模システム開発のスペシャリスト。チームリーダーシップに長ける"
  }
]

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-32">
        {/* Hero Section */}
        <section className="pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-8">
                私たちについて
              </h1>
              <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
                テクノロジーで未来を創造し、お客様のビジネスを次のステージへ導く
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <Image
                  src="/futuristic-office-team-meeting.png"
                  alt="Company Team"
                  width={600}
                  height={400}
                  className="rounded-2xl"
                />
              </div>
              <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <h2 className="text-3xl font-light text-gray-900 mb-8">未来を創るテクノロジーカンパニー</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">
                  2010年の創業以来、私たちは最先端のテクノロジーを駆使して、
                  お客様のビジネス課題を解決し続けています。AI・機械学習、
                  クラウドコンピューティング、IoTなどの革新的技術を活用し、
                  真の価値をもたらすソリューションを提供しています。
                </p>
                <div className="space-y-4">
                  {[
                    "15年以上の豊富な実績と信頼",
                    "500社以上のお客様との成功事例",
                    "24時間365日の充実したサポート体制",
                    "世界基準の品質とセキュリティ"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-4"></div>
                      <span className="text-gray-700 font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center p-8 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-4xl font-light text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-light">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-gray-900 mb-6">私たちの価値観</h2>
              <p className="text-xl text-gray-600 font-light">
                これらの価値観が、私たちの行動指針となっています
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className={`text-center p-8 hover:bg-gray-50 rounded-2xl transition-all duration-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 font-light">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-gray-900 mb-6">経営陣</h2>
              <p className="text-xl text-gray-600 font-light">
                豊富な経験と専門知識を持つリーダーたち
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative mb-6">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={150}
                      height={150}
                      className="mx-auto rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{member.name}</h3>
                  <Badge className="mb-4 bg-blue-600 text-white rounded-full">
                    {member.position}
                  </Badge>
                  <p className="text-gray-600 text-sm font-light">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-4xl font-light text-gray-900 mb-8">私たちのミッション</h2>
              <div className="bg-gray-50 rounded-2xl p-12">
                <p className="text-2xl text-gray-700 leading-relaxed mb-6 font-light">
                  「テクノロジーの力で、すべての企業が持つ可能性を最大限に引き出し、
                  より良い未来を創造する」
                </p>
                <p className="text-gray-600 font-light">
                  私たちは、単なるシステム開発会社ではありません。
                  お客様のビジネスパートナーとして、共に成長し、
                  共に未来を創造していく存在でありたいと考えています。
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

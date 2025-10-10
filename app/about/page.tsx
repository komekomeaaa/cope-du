'use client'

import { Badge } from "@/components/ui/badge"
import { Users, Target, Award, Shield } from 'lucide-react'
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import Image from "next/image"
import { useScrollAnimation } from "../hooks/useScrollAnimation"
import { siteConfig } from "@/config/site"

const stats = [
  { number: "15+", label: "年の実績", icon: Award },
  { number: "500+", label: "プロジェクト完了", icon: Target },
  { number: "50+", label: "専門エンジニア", icon: Users },
  { number: "24/7", label: "サポート体制", icon: Shield }
]

export default function AboutPage() {
  const heroAnimation = useScrollAnimation()
  const contentAnimation = useScrollAnimation()
  const statsAnimation = useScrollAnimation()
  const valuesAnimation = useScrollAnimation()
  const teamAnimation = useScrollAnimation()
  const missionAnimation = useScrollAnimation()

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="pt-32">
        {/* Hero Section */}
        <section className="pb-20 px-4 bg-white/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div 
              ref={heroAnimation.ref}
              className={`text-center mb-20 transition-all duration-1000 ${
                heroAnimation.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-6 leading-tight">
                会社情報
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light max-w-4xl mx-auto leading-relaxed">
                テクノロジーで未来を創造し、お客様のビジネスを次のステージへ導く
              </p>
            </div>

            <div ref={contentAnimation.ref} className="grid md:grid-cols-2 gap-20 items-center mb-20">
              <div 
                className={`relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl transition-all duration-1000 ${
                  contentAnimation.isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-10'
                }`}
              >
                <Image
                  src="/futuristic-office-team-meeting.png"
                  alt="Company Team"
                  fill
                  className="object-cover"
                />
              </div>
              <div 
                className={`transition-all duration-1000 delay-300 ${
                  contentAnimation.isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-10'
                }`}
              >
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">未来をつくる<br />テクノロジーカンパニー</h2>
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
          <div ref={statsAnimation.ref} className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 text-center">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`space-y-4 transition-all duration-700 ${
                    statsAnimation.isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: statsAnimation.isVisible ? `${index * 150}ms` : '0ms' 
                  }}
                >
                  <div className="mx-auto w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <stat.icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <div className="text-5xl font-light text-gray-900">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-light text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 px-4 bg-white/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div 
              ref={valuesAnimation.ref}
              className={`text-center mb-20 transition-all duration-1000 ${
                valuesAnimation.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">私たちの価値観</h2>
              <p className="text-xl text-gray-600 font-light">
                これらの価値観が、私たちの行動指針となっています
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              {siteConfig.values.map((value, index) => (
                <div 
                  key={index}
                  className={`space-y-4 transition-all duration-700 ${
                    valuesAnimation.isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: valuesAnimation.isVisible ? `${index * 150}ms` : '0ms' 
                  }}
                >
                  <div className="text-5xl">{value.icon}</div>
                  <h3 className="text-2xl font-normal text-gray-900">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed">
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
            <div 
              ref={teamAnimation.ref}
              className={`text-center mb-20 transition-all duration-1000 ${
                teamAnimation.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">経営陣</h2>
              <p className="text-xl text-gray-600 font-light">
                豊富な経験と専門知識を持つリーダーたち
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {siteConfig.team.map((member, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-3xl p-10 text-center shadow-md hover:shadow-xl transition-all duration-700 ${
                    teamAnimation.isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: teamAnimation.isVisible ? `${index * 200}ms` : '0ms' 
                  }}
                >
                  <div className="relative mb-8 mx-auto w-32 h-32 rounded-full overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-normal text-gray-900 mb-2">{member.name}</h3>
                  <Badge className="mb-6 bg-blue-50 text-blue-700 hover:bg-blue-50 border-0 rounded-full text-xs">
                    {member.position}
                  </Badge>
                  <p className="text-gray-600 font-light leading-relaxed">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 px-4 bg-white/30 backdrop-blur-sm">
          <div 
            ref={missionAnimation.ref}
            className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${
              missionAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-12">
              {siteConfig.mission.title}
            </h2>
            <div className="bg-blue-600 rounded-3xl p-16">
              <p className="text-3xl md:text-4xl text-white leading-relaxed mb-8 font-light">
                「{siteConfig.mission.statement}」
              </p>
              <p className="text-xl text-blue-100 font-light leading-relaxed">
                {siteConfig.mission.description}
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

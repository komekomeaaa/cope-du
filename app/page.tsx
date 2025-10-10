'use client'

import Link from "next/link"
import Image from "next/image"
import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { useScrollAnimation } from "./hooks/useScrollAnimation"
import { saasProducts, siteConfig } from "@/config/site"

const highlights = saasProducts.slice(0, 3).map(product => ({
  title: product.name,
  description: product.description,
  icon: product.icon,
  link: "/services"
}))

export default function HomePage() {
  const heroAnimation = useScrollAnimation()
  const featuresAnimation = useScrollAnimation()
  const statsAnimation = useScrollAnimation()
  const ctaAnimation = useScrollAnimation()

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section - Google Style */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-white/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div 
              ref={heroAnimation.ref}
              className={`space-y-8 transition-all duration-1000 ${
                heroAnimation.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="inline-block">
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                  最新のテクノロジーニュース
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 leading-tight">
                {siteConfig.company.tagline}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                {siteConfig.company.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                >
                  お問い合わせ
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="/services"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  サービス詳細
                </Link>
              </div>
            </div>
            <div 
              className={`relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 delay-300 ${
                heroAnimation.isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-10'
              }`}
            >
              <Image
                src="/modern-office-building.png"
                alt="TechCorp Office"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards - Google Style */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={featuresAnimation.ref}
            className={`text-center mb-16 transition-all duration-1000 ${
              featuresAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              私たちのソリューション
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
              テクノロジーの力で、ビジネスの可能性を広げます
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <Link key={index} href={item.link}>
                <Card 
                  className={`group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white h-full ${
                    featuresAnimation.isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: featuresAnimation.isVisible ? `${index * 150}ms` : '0ms' 
                  }}
                >
                  <CardContent className="p-12 text-center">
                    <div className="text-6xl mb-6">{item.icon}</div>
                    <h3 className="text-2xl font-medium text-gray-900 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <div className="inline-flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all">
                      詳細を見る
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Simple & Clean */}
      <section className="py-24 px-4 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={statsAnimation.ref}
            className="grid md:grid-cols-4 gap-12 text-center"
          >
            {siteConfig.stats.map((stat, index) => (
              <div 
                key={index}
                className={`transition-all duration-700 ${
                  statsAnimation.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: statsAnimation.isVisible ? `${index * 150}ms` : '0ms' 
                }}
              >
                <div className="text-5xl font-light text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-light">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-blue-600">
        <div 
          ref={ctaAnimation.ref}
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            ctaAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            始めましょう
          </h2>
          <p className="text-xl text-blue-100 font-light mb-8">
            プロジェクトのご相談から技術的なお悩みまで、お気軽にご連絡ください
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-blue-600 bg-white rounded-full hover:bg-gray-100 transition-colors"
          >
            お問い合わせ
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

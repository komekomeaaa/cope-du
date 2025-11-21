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
  const ctaAnimation = useScrollAnimation()

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section - Premium Design */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              ref={heroAnimation.ref}
              className={`space-y-10 transition-all duration-1000 ${heroAnimation.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
                }`}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-900 leading-[1.1] tracking-tight whitespace-pre-line">
                {siteConfig.company.tagline}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 font-normal leading-loose whitespace-pre-line">
                {siteConfig.company.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-5 pt-6">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center px-9 py-4 text-base font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl transition-all duration-400 shadow-md hover:shadow-lg"
                >
                  お問い合わせ
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold text-gray-700 bg-white/80 backdrop-blur-md hover:bg-white rounded-xl transition-all duration-400 border border-gray-300/80 shadow-sm hover:shadow-md"
                >
                  サービス詳細
                </Link>
              </div>
            </div>
            <div
              className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl transition-all duration-1000 delay-300 ${heroAnimation.isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10'
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-700/5 to-indigo-700/5 mix-blend-overlay z-10"></div>
              <Image
                src="/creative_office_workspace_1763650589536.png"
                alt="Cogmiru Inc. Workspace"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-24 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div
            ref={featuresAnimation.ref}
            className={`text-center mb-20 transition-all duration-1000 ${featuresAnimation.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
              }`}
          >
            <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 tracking-tight">
              私たちのソリューション
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 font-normal max-w-3xl mx-auto">
              テクノロジーの力で、ビジネスの可能性を広げます
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <Link key={index} href={item.link}>
                <Card
                  className={`group border-0 shadow-lg hover:shadow-xl transition-all duration-400 overflow-hidden bg-white/80 backdrop-blur-md h-full hover:-translate-y-1 ${featuresAnimation.isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                    }`}
                  style={{
                    transitionDelay: featuresAnimation.isVisible ? `${index * 150}ms` : '0ms'
                  }}
                >
                  <CardContent className="p-10 text-center">
                    <div className="text-5xl mb-7 transform group-hover:scale-105 transition-transform duration-400">{item.icon}</div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 font-normal leading-relaxed mb-6 text-base">
                      {item.description}
                    </p>
                    <div className="inline-flex items-center text-blue-700 font-semibold group-hover:gap-2 transition-all">
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

      {/* CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div
          ref={ctaAnimation.ref}
          className={`max-w-5xl mx-auto text-center relative z-10 transition-all duration-1000 ${ctaAnimation.isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
            }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-8 tracking-tight">
            始めましょう
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 font-normal mb-12 leading-loose">
            プロジェクトのご相談から技術的なお悩みまで、お気軽にご連絡ください
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center px-11 py-5 text-lg font-semibold text-blue-800 bg-white rounded-xl hover:bg-blue-50 transition-all duration-400 shadow-lg hover:shadow-xl"
          >
            お問い合わせ
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

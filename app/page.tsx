'use client'

import Link from "next/link"
import Image from "next/image"
import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Bot, CircleDollarSign, Rocket, RefreshCw, TrendingUp, ShieldCheck, Globe, Lightbulb, Heart, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useScrollAnimation } from "./hooks/useScrollAnimation"
import { saasProducts, siteConfig } from "@/config/site"

const iconMap: Record<string, LucideIcon> = {
  Bot, CircleDollarSign, Rocket, RefreshCw, TrendingUp, ShieldCheck, Globe, Lightbulb, Heart, Zap,
}

const prioritizedProducts = [...saasProducts].sort((a, b) => {
  if (a.href === '/ai-consulting') return -1
  if (b.href === '/ai-consulting') return 1
  return 0
})

const highlights = prioritizedProducts.map(product => ({
  title: product.name,
  description: product.description,
  icon: product.icon,
  link: product.href ?? "/services"
}))

export default function HomePage() {
  const heroAnimation = useScrollAnimation()
  const featuresAnimation = useScrollAnimation()
  const statsAnimation = useScrollAnimation()
  const ctaAnimation = useScrollAnimation()

  return (
    <div className="min-h-screen">
      <Header />

      <main id="main-content">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              ref={heroAnimation.ref}
              className={`space-y-8 transition-[opacity,transform] duration-1000 ${heroAnimation.isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
                }`}
            >
              <div className="inline-block">
                <span className="text-sm font-medium text-cyan-700 bg-cyan-50 border border-cyan-200 px-4 py-2 rounded-md">
                  500件超の業務改善プロジェクト
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-light text-slate-900 leading-tight text-balance font-[family-name:var(--font-display)]">
                {siteConfig.company.tagline}
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 leading-relaxed">
                {siteConfig.company.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-600/20"
                >
                  30分の無料相談を予約
                  <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-slate-700 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 transition-all"
                >
                  導入メニューを見る
                </Link>
              </div>
            </div>
            <div
              className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/40 ring-1 ring-slate-200 transition-[opacity,transform] duration-1000 delay-300 ${heroAnimation.isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-10'
                }`}
            >
              <Image
                src="/modern-office-building.png"
                alt="株式会社コグミル オフィス"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div
            ref={featuresAnimation.ref}
            className={`text-center mb-16 transition-[opacity,transform] duration-1000 ${featuresAnimation.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
              }`}
          >
            <h2 className="text-4xl md:text-5xl font-normal text-slate-900 mb-6 text-wrap-balance font-[family-name:var(--font-display)]">
              私たちのソリューション
            </h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto">
              テクノロジーの力で、ビジネスの可能性を広げます
            </p>
          </div>

          <div className="grid md:grid-cols-2 max-w-5xl mx-auto gap-8">
            {highlights.map((item, index) => {
              const IconComponent = iconMap[item.icon]
              return (
                <Link key={index} href={item.link}>
                  <Card
                    className={`group bg-white border border-slate-200/60 shadow-lg hover:shadow-xl hover:border-cyan-300 transition-[opacity,transform,box-shadow,border-color] duration-500 overflow-hidden h-full ${featuresAnimation.isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                      }`}
                    style={{
                      transitionDelay: featuresAnimation.isVisible ? `${index * 150}ms` : '0ms'
                    }}
                  >
                    <CardContent className="p-10 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 bg-cyan-50 rounded-xl flex items-center justify-center">
                        {IconComponent && <IconComponent aria-hidden="true" className="h-8 w-8 text-cyan-600" />}
                      </div>
                      <h3 className="text-2xl font-medium text-slate-900 mb-4 font-[family-name:var(--font-display)]">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 leading-relaxed mb-6">
                        {item.description}
                      </p>
                      <div className="inline-flex items-center text-cyan-600 font-medium group-hover:gap-2 transition-[gap]">
                        詳細を見る
                        <ArrowRight aria-hidden="true" className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div
            ref={statsAnimation.ref}
            className="grid md:grid-cols-4 gap-12 text-center"
          >
            {siteConfig.stats.map((stat, index) => (
              <div
                key={index}
                className={`transition-[opacity,transform] duration-700 ${statsAnimation.isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                  }`}
                style={{
                  transitionDelay: statsAnimation.isVisible ? `${index * 150}ms` : '0ms'
                }}
              >
                <div className="text-5xl font-medium text-slate-900 mb-2 tabular-nums font-[family-name:var(--font-display)]">{stat.number}</div>
                <div className="text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto rounded-2xl bg-slate-900 p-12 md:p-16">
          <div
            ref={ctaAnimation.ref}
            className={`max-w-4xl mx-auto text-center transition-[opacity,transform] duration-1000 ${ctaAnimation.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
              }`}
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6 text-wrap-balance font-[family-name:var(--font-display)]">
              始めましょう
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              プロジェクトのご相談から技術的なお悩みまで、お気軽にご連絡ください
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/20"
            >
              無料相談を申し込む
              <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  )
}

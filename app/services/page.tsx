'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Bot, CircleDollarSign, Rocket, RefreshCw, TrendingUp, ShieldCheck, Globe } from 'lucide-react'
import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { useScrollAnimation } from "../hooks/useScrollAnimation"
import { saasProducts, saasFeatures } from "@/config/site"

const iconMap: Record<string, LucideIcon> = {
  Bot, CircleDollarSign, Rocket, RefreshCw, TrendingUp, ShieldCheck, Globe,
}

export default function ServicesPage() {
  const heroAnimation = useScrollAnimation()
  const productsAnimation = useScrollAnimation()
  const saasAnimation = useScrollAnimation()
  const prioritizedProducts = [...saasProducts].sort((a, b) => {
    if (a.href === '/ai-consulting') return -1
    if (b.href === '/ai-consulting') return 1
    return 0
  })

  return (
    <div className="min-h-screen">
      <Header />

      <main id="main-content">
        {/* Hero Section */}
        <section className="pt-12 pb-20 px-4 bg-white/30">
          <div
            ref={heroAnimation.ref}
            className={`max-w-5xl mx-auto text-center transition-[opacity,transform] duration-1000 ${
              heroAnimation.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-block mb-6">
              <span className="text-sm font-medium text-slate-700 bg-slate-100 px-4 py-2 rounded-md">
                事業案内
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 leading-tight text-balance">
              AIソリューション&コンサルティングで<br />業務を進化
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
              課題整理から導入、定着化まで。事業フェーズに合わせて最適な支援を提供します。
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="pb-24 px-4 bg-white/30">
          <div ref={productsAnimation.ref} className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 max-w-5xl mx-auto gap-8">
              {prioritizedProducts.map((product, index) => {
                const IconComponent = iconMap[product.icon]
                return (
                  <Card
                    key={product.id}
                    className={`group relative bg-white border-0 shadow-lg hover:shadow-2xl transition-[opacity,transform,box-shadow] duration-500 overflow-hidden ${
                      product.popular ? 'ring-2 ring-slate-800' : ''
                    } ${
                      productsAnimation.isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                    }`}
                    style={{
                      transitionDelay: productsAnimation.isVisible ? `${index * 150}ms` : '0ms'
                    }}
                  >
                    {product.popular && (
                      <div className="absolute top-0 right-0 bg-slate-800 text-white text-xs px-4 py-1 rounded-bl-lg">
                        人気No.1
                      </div>
                    )}

                    <CardHeader className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 bg-slate-100 rounded-xl flex items-center justify-center">
                        {IconComponent && <IconComponent aria-hidden="true" className="h-8 w-8 text-slate-700" />}
                      </div>
                      <CardTitle className="text-2xl font-normal text-slate-900 mb-2">
                        {product.name}
                      </CardTitle>
                      <p className="text-slate-700 font-medium mb-4">{product.tagline}</p>
                      <CardDescription className="text-slate-600 leading-relaxed">
                        {product.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="px-8 pb-8">
                      <div className="space-y-3">
                        {product.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                            <Check aria-hidden="true" className="h-4 w-4 text-slate-700 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 text-center">
                        <Link
                          href={product.href ?? '/services'}
                          className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                        >
                          詳細を見る
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* SaaS Features Section */}
        <section className="py-20 px-4 bg-white/30">
          <div className="max-w-6xl mx-auto">
            <div
              ref={saasAnimation.ref}
              className={`text-center mb-20 transition-[opacity,transform] duration-1000 ${
                saasAnimation.isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-normal text-slate-900 mb-4 text-wrap-balance">
                AIソリューションの特長
              </h2>
              <p className="text-xl text-slate-600">
                現場で使える運用設計と、継続改善を前提にした支援
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {saasFeatures.map((feature, index) => {
                const IconComponent = iconMap[feature.icon]
                return (
                  <div
                    key={index}
                    className={`text-center transition-[opacity,transform] duration-700 ${
                      saasAnimation.isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                    }`}
                    style={{
                      transitionDelay: saasAnimation.isVisible ? `${index * 150}ms` : '0ms'
                    }}
                  >
                    <div className="w-14 h-14 mx-auto mb-6 bg-slate-100 rounded-xl flex items-center justify-center">
                      {IconComponent && <IconComponent aria-hidden="true" className="h-7 w-7 text-slate-700" />}
                    </div>
                    <h3 className="text-2xl font-normal text-slate-900 mb-4">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="pb-24 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-normal text-slate-900 mb-8 text-center text-balance">
              導入前によくある質問
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border border-slate-200 shadow-sm bg-white">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl text-slate-900">導入にどれくらい時間がかかる？</h3>
                  <p className="text-slate-600">
                    初期ヒアリング後、最短2週間でPoCを開始。既存業務に合わせて段階導入できます。
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-slate-200 shadow-sm bg-white">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl text-slate-900">費用対効果はどう判断する？</h3>
                  <p className="text-slate-600">
                    工数削減時間・ミス削減率・回収期間を共通指標で可視化し、導入前後で比較します。
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-slate-200 shadow-sm bg-white">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl text-slate-900">既存システムとの連携は可能？</h3>
                  <p className="text-slate-600">
                    API連携を前提に、既存のSaaS・基幹系への接続方針を設計段階で整理します。
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-slate-200 shadow-sm bg-white">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl text-slate-900">セキュリティ要件は満たせる？</h3>
                  <p className="text-slate-600">
                    権限設計・ログ監査・データ保護ポリシーを事前に定義し、運用体制まで含めて提案します。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

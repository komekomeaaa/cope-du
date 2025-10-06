'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from 'lucide-react'
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { useScrollAnimation } from "../hooks/useScrollAnimation"
import { saasProducts, saasFeatures } from "@/config/site"
import Link from "next/link"

export default function ServicesPage() {
  const heroAnimation = useScrollAnimation()
  const productsAnimation = useScrollAnimation()
  const pricingAnimation = useScrollAnimation()
  const saasAnimation = useScrollAnimation()

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-32">
        {/* Hero Section */}
        <section className="pb-20 px-4">
          <div 
            ref={heroAnimation.ref}
            className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${
              heroAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-block mb-6">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                SaaS プロダクト
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-6 leading-tight">
              ビジネスを加速する<br />クラウドソリューション
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-4xl mx-auto">
              導入即日から使える、シンプルで強力なSaaSツール
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="pb-24 px-4">
          <div ref={productsAnimation.ref} className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {saasProducts.map((product, index) => (
                <Card 
                  key={product.id}
                  className={`group relative bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                    product.popular ? 'ring-2 ring-blue-600' : ''
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
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-4 py-1 rounded-bl-lg">
                      人気No.1
                    </div>
                  )}
                  
                  <CardHeader className="p-8 text-center">
                    <div className="text-6xl mb-6">{product.icon}</div>
                    <CardTitle className="text-2xl font-normal text-gray-900 mb-2">
                      {product.name}
                    </CardTitle>
                    <p className="text-blue-600 font-medium mb-4">{product.tagline}</p>
                    <CardDescription className="text-gray-600 font-light leading-relaxed">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="px-8 pb-8">
                    <div className="space-y-3 mb-6">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                          <span className="font-light">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link href="/contact">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6 text-base">
                        詳細を見る
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div 
              ref={pricingAnimation.ref}
              className={`text-center mb-20 transition-all duration-1000 ${
                pricingAnimation.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                シンプルな料金プラン
              </h2>
              <p className="text-xl text-gray-600 font-light">
                ビジネスの規模に合わせて選べる3つのプラン
              </p>
            </div>

            {saasProducts.map((product, productIndex) => (
              <div 
                key={product.id}
                className={`mb-16 transition-all duration-700 ${
                  pricingAnimation.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: pricingAnimation.isVisible ? `${productIndex * 200}ms` : '0ms' 
                }}
              >
                <h3 className="text-2xl font-normal text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-4xl">{product.icon}</span>
                  {product.name}
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {Object.entries(product.pricing).map(([key, plan]) => (
                    <Card 
                      key={key}
                      className={`border-0 shadow-md hover:shadow-xl transition-shadow duration-300 ${
                        key === 'professional' ? 'ring-2 ring-blue-600' : ''
                      }`}
                    >
                      <CardHeader className="p-8 text-center">
                        {key === 'professional' && (
                          <Badge className="mb-4 bg-blue-600 text-white">おすすめ</Badge>
                        )}
                        <CardTitle className="text-xl font-medium text-gray-900 mb-4">
                          {plan.name}
                        </CardTitle>
                        <div className="mb-4">
                          <span className="text-4xl font-light text-gray-900">{plan.price}</span>
                          <span className="text-gray-600 font-light">{plan.period}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="px-8 pb-8">
                        <Link href="/contact">
                          <Button 
                            className={`w-full rounded-full py-5 ${
                              key === 'professional' 
                                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                            }`}
                          >
                            {plan.price === 'お問い合わせ' ? 'お問い合わせ' : '今すぐ始める'}
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SaaS Features Section */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div 
              ref={saasAnimation.ref}
              className={`text-center mb-20 transition-all duration-1000 ${
                saasAnimation.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                SaaSならではの利点
              </h2>
              <p className="text-xl text-gray-600 font-light">
                クラウドベースで、いつでもどこでも
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {saasFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className={`text-center transition-all duration-700 ${
                    saasAnimation.isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: saasAnimation.isVisible ? `${index * 150}ms` : '0ms' 
                  }}
                >
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-normal text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 font-light leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              無料トライアルを始めよう
            </h2>
            <p className="text-xl text-blue-100 font-light mb-8">
              14日間無料で全機能をお試しいただけます<br />
              クレジットカード登録不要
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full">
                  無料で始める
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full">
                  デモを見る
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

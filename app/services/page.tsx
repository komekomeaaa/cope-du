'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from 'lucide-react'
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { useScrollAnimation } from "../hooks/useScrollAnimation"
import { saasProducts, saasFeatures } from "@/config/site"

export default function ServicesPage() {
  const heroAnimation = useScrollAnimation()
  const productsAnimation = useScrollAnimation()
  const saasAnimation = useScrollAnimation()

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="pt-32">
        {/* Hero Section */}
        <section className="pb-20 px-4 bg-white/30 backdrop-blur-sm">
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
                製品紹介
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-6 leading-tight">
              革新的なソリューションで<br />ビジネスを変革
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-4xl mx-auto">
              最先端の技術と洗練されたデザインが融合した製品群
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="pb-24 px-4 bg-white/30 backdrop-blur-sm">
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
                    <div className="space-y-3">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                          <span className="font-light">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SaaS Features Section */}
        <section className="py-24 px-4 bg-white/30 backdrop-blur-sm">
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
                製品の特長
              </h2>
              <p className="text-xl text-gray-600 font-light">
                優れた機能性と使いやすさを兼ね備えた製品群
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
      </div>

      <Footer />
    </div>
  )
}

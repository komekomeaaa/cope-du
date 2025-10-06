'use client'

import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNews } from "../contexts/NewsContext"
import Link from "next/link"
import { Calendar, User } from 'lucide-react'
import { useScrollAnimation } from "../hooks/useScrollAnimation"

export default function NewsPage() {
  const { getPublishedNews } = useNews()
  const news = getPublishedNews()
  const heroAnimation = useScrollAnimation()
  const newsAnimation = useScrollAnimation()

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-32">
        {/* Hero Section */}
        <section className="pb-20 px-4">
          <div 
            ref={heroAnimation.ref}
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              heroAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-8">
              ニュース
            </h1>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
              最新のお知らせやプレスリリースをご覧ください
            </p>
          </div>
        </section>

        {/* News Grid */}
        <section className="pb-24 px-4">
          <div ref={newsAnimation.ref} className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item, index) => (
                <Link key={item.id} href={`/news/${item.id}`}>
                  <Card 
                    className={`h-full hover:shadow-lg transition-all duration-500 cursor-pointer border-0 shadow-md ${
                      newsAnimation.isVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-10'
                    }`}
                    style={{ 
                      transitionDelay: newsAnimation.isVisible ? `${index * 100}ms` : '0ms' 
                    }}
                  >
                    {item.image && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-blue-600 text-white">
                          {item.category}
                        </Badge>
                        {item.featured && (
                          <Badge variant="outline" className="border-orange-400 text-orange-600">
                            注目
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl font-medium text-gray-900 line-clamp-2">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {item.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {item.author}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 font-light line-clamp-3">
                        {item.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}


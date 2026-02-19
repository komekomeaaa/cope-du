import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User } from "lucide-react"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { seedNews } from "@/lib/news"

export const metadata: Metadata = {
  title: "ニュース",
  description: "Cogmiruの最新ニュース・お知らせ・イベント情報を掲載しています。",
  alternates: {
    canonical: "/news",
  },
}

export default function NewsPage() {
  const news = seedNews.filter((item) => item.status === "published")

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="pt-32">
        <section className="pb-20 px-4 bg-white/30 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-8 text-balance">ニュース</h1>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
              最新のお知らせ・プレスリリース・イベント情報をまとめています
            </p>
          </div>
        </section>

        <section className="pb-24 px-4 bg-white/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <Link key={item.id} href={`/news/${item.id}`}>
                  <Card className="h-full hover:shadow-lg transition-[box-shadow] duration-500 cursor-pointer border-0 shadow-md">
                    {item.image && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={800}
                          height={450}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-blue-600 text-white">{item.category}</Badge>
                        {item.featured && (
                          <Badge variant="outline" className="border-orange-400 text-orange-600">
                            注目
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl font-medium text-gray-900 line-clamp-2">{item.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" aria-hidden="true" />
                          {item.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" aria-hidden="true" />
                          {item.author}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 font-light line-clamp-3">{item.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

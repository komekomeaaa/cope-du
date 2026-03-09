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
  description: "株式会社コグミルの最新ニュース・お知らせ・イベント情報を掲載しています。",
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
        <section className="pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-8 text-balance font-[family-name:var(--font-display)]">ニュース</h1>
            <p className="text-xl text-slate-500 font-light max-w-3xl mx-auto">
              最新のお知らせ・プレスリリース・イベント情報をまとめています
            </p>
          </div>
        </section>

        <section className="pb-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <Link key={item.id} href={`/news/${item.id}`}>
                  <Card className="h-full bg-white border border-slate-200/60 shadow-md hover:shadow-lg hover:border-cyan-300 transition-[box-shadow,border-color] duration-500 cursor-pointer">
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
                        <Badge className="bg-cyan-600 text-white">{item.category}</Badge>
                        {item.featured && (
                          <Badge variant="outline" className="border-amber-400 text-amber-600">
                            注目
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl font-medium text-slate-900 line-clamp-2">{item.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 text-sm text-slate-400">
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
                      <p className="text-slate-500 font-light line-clamp-3">{item.excerpt}</p>
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

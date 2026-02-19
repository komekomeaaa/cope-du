import type { MetadataRoute } from "next"
import { seedNews } from "@/lib/news"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cogmiru.com"

  const staticPages = ["", "/about", "/services", "/news", "/contact", "/privacy", "/terms"].map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
    lastModified: new Date(),
  }))

  const newsPages = seedNews
    .filter((item) => item.status === "published")
    .map((item) => ({
      url: `${baseUrl}/news/${item.id}`,
      lastModified: new Date(item.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

  return [...staticPages, ...newsPages]
}

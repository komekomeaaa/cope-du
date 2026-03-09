import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Sora, DM_Sans } from "next/font/google"
import { ClientLayout } from "./components/ClientLayout"
import { siteConfig } from "@/config/site"

const fontDisplay = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const fontBody = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.cogmiru.com"),
  title: {
    default: "株式会社コグミル | AI・業務改善ソリューション",
    template: "%s | 株式会社コグミル",
  },
  description:
    "AIと業務設計で、日々の定型業務を短縮。導入相談から運用定着まで伴走します。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "株式会社コグミル | AI・業務改善ソリューション",
    description:
      "AIと業務設計で、日々の定型業務を短縮。導入相談から運用定着まで伴走します。",
    type: "website",
    locale: "ja_JP",
    url: "/",
    siteName: "株式会社コグミル",
  },
  twitter: {
    card: "summary_large_image",
    title: "株式会社コグミル | AI・業務改善ソリューション",
    description:
      "AIと業務設計で、日々の定型業務を短縮。導入相談から運用定着まで伴走します。",
  },
}

export const viewport: Viewport = {
  themeColor: "#f8fafc",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.company.name,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.cogmiru.com",
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.building,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.prefecture,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: "JP",
    },
  }

  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${fontDisplay.variable} ${fontBody.variable} font-[family-name:var(--font-body)] antialiased relative`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-gray-900 focus:shadow"
        >
          メインコンテンツへスキップ
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

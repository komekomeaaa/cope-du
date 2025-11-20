import Link from "next/link"
import { siteConfig } from "@/config/site"

export function Footer() {
  const footerSections = [
    {
      title: '事業案内',
      links: [
        { name: 'システム開発', href: '/services' },
        { name: 'AI ソリューション', href: '/services' },
        { name: 'クラウド基盤', href: '/services' },
        { name: 'データ分析', href: '/services' },
      ]
    },
    {
      title: '企業情報',
      links: [
        { name: '会社概要', href: '/about' },
        { name: 'ニュース', href: '/news' },
        { name: 'お問い合わせ', href: '/contact' },
      ]
    },
    {
      title: 'リソース',
      links: [
        { name: 'ブログ', href: '#' },
        { name: 'プライバシー', href: '#' },
      ]
    }
  ]

  return (
    <footer className="bg-white/60 border-t border-gray-100 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
            {/* Brand - Full width on mobile, col-span on larger screens */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-block mb-4 sm:mb-6">
                <span className="text-lg sm:text-xl font-normal text-gray-900">
                  {siteConfig.company.name}
                </span>
              </Link>
              <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed max-w-xs whitespace-pre-line">
                {siteConfig.company.description}
              </p>
            </div>

            {/* Footer Links - optimized for all screen sizes */}
            {footerSections.map((section) => (
              <div key={section.title} className="min-w-0">
                <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-3 sm:mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors font-light inline-block py-1 touch-manipulation"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar - responsive layout */}
        <div className="border-t border-gray-100 py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-600 font-light text-center sm:text-left">
              &copy; {new Date().getFullYear()} {siteConfig.company.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              <Link
                href="#"
                className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors font-light touch-manipulation py-1"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="#"
                className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors font-light touch-manipulation py-1"
              >
                利用規約
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

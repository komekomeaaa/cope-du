import Link from "next/link"
import { Lock } from "lucide-react"
import { siteConfig } from "@/config/site"

export function Footer() {
  const footerSections = [
    {
      title: 'プロダクト',
      links: [
        { name: 'システム開発', href: '/services' },
        { name: 'AI ソリューション', href: '/services' },
        { name: 'クラウド基盤', href: '/services' },
        { name: 'データ分析', href: '/services' },
      ]
    },
    {
      title: '会社情報',
      links: [
        { name: '会社概要', href: '/about' },
        { name: 'ニュース', href: '/news' },
        { name: '採用情報', href: '#' },
        { name: 'お問い合わせ', href: '/contact' },
      ]
    },
    {
      title: 'リソース',
      links: [
        { name: 'ブログ', href: '#' },
        { name: 'ヘルプセンター', href: '#' },
        { name: 'セキュリティ', href: '#' },
        { name: 'プライバシー', href: '#' },
      ]
    }
  ]

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="inline-block mb-4">
                <span className="text-xl font-normal text-gray-900">
                  {siteConfig.company.name}
                </span>
              </Link>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                {siteConfig.company.description.split('、')[0]}で、<br />
                ビジネスの未来を創造
              </p>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-light"
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

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 font-light">
              &copy; {new Date().getFullYear()} {siteConfig.company.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-light">
                プライバシーポリシー
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-light">
                利用規約
              </Link>
              <Link 
                href="/admin" 
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors font-light group"
                title="管理者ログイン"
              >
                <Lock className="h-3 w-3 group-hover:text-blue-600 transition-colors" />
                <span className="group-hover:text-blue-600 transition-colors">Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

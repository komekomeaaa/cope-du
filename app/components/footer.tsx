import Link from "next/link"
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-medium text-white mb-4">TechCorp</div>
            <p className="text-gray-400 mb-6 font-light leading-relaxed">
              革新的なテクノロジーソリューションで、
              お客様のビジネスを次のレベルへ。
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6 text-white">サービス</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors duration-300 font-light">システム開発</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors duration-300 font-light">コンサルティング</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors duration-300 font-light">マーケティング支援</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors duration-300 font-light">データ分析</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6 text-white">会社情報</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300 font-light">会社概要</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300 font-light">採用情報</Link></li>
              <li><Link href="/news" className="text-gray-400 hover:text-white transition-colors duration-300 font-light">ニュース</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300 font-light">お問い合わせ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6 text-white">お問い合わせ</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-gray-400" />
                <span className="text-gray-400 font-light">03-1234-5678</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-gray-400" />
                <span className="text-gray-400 font-light">info@techcorp.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-3 text-gray-400 mt-1" />
                <span className="text-gray-400 font-light">
                  東京都新宿区西新宿1-1-1<br />
                  新宿ビル10F
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 font-light">
            &copy; {new Date().getFullYear()} TechCorp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

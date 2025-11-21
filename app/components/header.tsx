'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Link from "next/link"
import { siteConfig } from "@/config/site"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: '製品情報', href: '/services' },
    { name: 'ニュース', href: '/news' },
    { name: '企業概要', href: '/about' },
    { name: 'お問い合わせ', href: '/contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-400 ${isScrolled ? 'bg-white/95 shadow-md backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center group min-w-0">
            <span className="text-xl sm:text-2xl font-medium text-gray-900 tracking-tight truncate">
              {siteConfig.company.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-4 lg:px-5 py-2.5 text-sm lg:text-base font-medium rounded-lg transition-all duration-300 ${isActive(item.href)
                  ? 'text-blue-700 bg-blue-50/80'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50/80'
                  }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-700 rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 text-gray-700 hover:bg-gray-100/80 rounded-lg transition-all duration-300 -mr-2"
            aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="py-3 sm:py-4 border-t border-gray-200/80">
            <nav className="space-y-1" role="navigation" aria-label="モバイルナビゲーション">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative block px-4 py-3.5 text-base sm:text-lg font-medium rounded-xl transition-all duration-300 touch-manipulation ${isActive(item.href)
                    ? 'text-blue-700 bg-blue-50/80'
                    : 'text-gray-700 hover:bg-gray-50/80 active:bg-gray-100/80'
                    } ${isMenuOpen
                      ? 'translate-y-0 opacity-100'
                      : '-translate-y-2 opacity-0'
                    }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                    minHeight: '44px'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {isActive(item.href) && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-700 rounded-r-full"></span>
                  )}
                  <span className={isActive(item.href) ? 'ml-2' : ''}>
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

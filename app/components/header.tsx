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
    { name: '企業情報', href: '/about' },
    { name: '事業案内', href: '/services' },
    { name: 'ニュース', href: '/news' },
    { name: 'お問い合わせ', href: '/contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
  }

  return (
    <>
      <header className={`sticky top-0 w-full z-50 transition-[background-color,box-shadow] duration-300 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center group min-w-0">
              <span className="text-lg sm:text-xl font-medium text-slate-900 tracking-tight truncate">
                {siteConfig.company.name}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 lg:px-4 py-2 text-sm lg:text-base rounded-lg transition-[color,background-color] ${
                    isActive(item.href)
                      ? 'text-slate-900 font-medium'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-slate-800 rounded-full"></span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors -mr-2"
              aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="py-3 sm:py-4 border-t border-slate-100">
              <nav className="space-y-1" role="navigation" aria-label="モバイルナビゲーション">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative block px-4 py-3.5 text-base sm:text-lg rounded-lg transition-[opacity,transform,background-color,color] duration-300 ${
                      isActive(item.href)
                        ? 'text-slate-900 bg-slate-50 font-medium'
                        : 'text-slate-700 hover:bg-slate-50 active:bg-slate-100'
                    } ${
                      isMenuOpen
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
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-slate-800 rounded-r-full"></span>
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
    </>
  )
}

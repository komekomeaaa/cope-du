'use client'

import { Badge } from "@/components/ui/badge"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { useScrollAnimation } from "../hooks/useScrollAnimation"
import { siteConfig } from "@/config/site"

export default function AboutPage() {
  const heroAnimation = useScrollAnimation()
  const visionMissionAnimation = useScrollAnimation()
  const philosophyAnimation = useScrollAnimation()
  const messageAnimation = useScrollAnimation()

  return (
    <div className="min-h-screen">
      <Header />

      <div className="pt-32 pb-20">
        {/* Hero Section - Clean & Modern */}
        <section className="px-4 mb-32">
          <div className="max-w-5xl mx-auto text-center">
            <div
              ref={heroAnimation.ref}
              className={`transition-all duration-1000 ${heroAnimation.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
                }`}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-gray-900 mb-6 tracking-tight">
                About Us
              </h1>
              <div className="w-24 h-1 bg-blue-700 mx-auto rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="px-4 mb-32">
          <div className="max-w-6xl mx-auto">
            <div ref={visionMissionAnimation.ref} className="grid md:grid-cols-2 gap-8">
              {/* Vision */}
              <div
                className={`relative group transition-all duration-1000 ${visionMissionAnimation.isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-10'
                  }`}
              >
                <div className="relative bg-gradient-to-br from-blue-50/90 to-indigo-50/90 backdrop-blur-lg border border-blue-200/60 rounded-2xl p-10 md:p-12 shadow-md hover:shadow-lg transition-all duration-400 h-full">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/10 rounded-full blur-xl"></div>
                  <h2 className="text-blue-700 text-sm font-bold tracking-widest uppercase mb-6 relative z-10">
                    {siteConfig.vision.title}
                  </h2>
                  <p className="text-2xl md:text-3xl font-normal text-gray-900 leading-tight relative z-10 whitespace-pre-line">
                    {siteConfig.vision.statement}
                  </p>
                </div>
              </div>

              {/* Mission */}
              <div
                className={`relative group transition-all duration-1000 delay-200 ${visionMissionAnimation.isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-10'
                  }`}
              >
                <div className="relative bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-lg rounded-2xl p-10 md:p-12 shadow-md hover:shadow-lg transition-all duration-400 h-full text-white">
                  <div className="absolute bottom-0 left-0 w-28 h-28 bg-gray-700/20 rounded-full blur-xl"></div>
                  <h2 className="text-gray-400 text-sm font-bold tracking-widest uppercase mb-6 relative z-10">
                    {siteConfig.mission.title}
                  </h2>
                  <p className="text-2xl md:text-3xl font-normal leading-tight relative z-10">
                    {siteConfig.mission.statement}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="px-4 mb-32">
          <div className="max-w-6xl mx-auto">
            <div ref={philosophyAnimation.ref} className="space-y-12">
              <div className={`text-center transition-all duration-1000 ${philosophyAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-4">Philosophy</h2>
                <p className="text-gray-700 font-normal text-lg">私たちが大切にする価値観</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {siteConfig.philosophy.map((item, index) => (
                  <div
                    key={index}
                    className={`bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-400 border border-gray-200/60 ${philosophyAnimation.isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                      }`}
                    style={{
                      transitionDelay: philosophyAnimation.isVisible ? `${(index + 1) * 150}ms` : '0ms'
                    }}
                  >
                    <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                      <span className="text-white font-bold text-xl">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 font-normal leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Message */}
        <section className="px-4 mb-32">
          <div className="max-w-4xl mx-auto">
            <div
              ref={messageAnimation.ref}
              className={`relative bg-white/80 backdrop-blur-xl rounded-2xl p-10 md:p-16 shadow-lg border border-gray-200/60 transition-all duration-1000 ${messageAnimation.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
                }`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-700 rounded-t-2xl"></div>

              <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-12 text-center">
                {siteConfig.corporateMessage.title}
              </h2>

              <div className="prose prose-lg max-w-none">
                {siteConfig.corporateMessage.content.split('\n\n').map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-gray-800 font-normal leading-loose mb-8 last:mb-0 whitespace-pre-line text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-12 text-right">
                <p className="text-gray-900 font-medium text-xl">Cogmiru Inc.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

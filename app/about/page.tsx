'use client'

import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { useScrollAnimation } from "../hooks/useScrollAnimation"
import { siteConfig } from "@/config/site"

export default function AboutPage() {
  const heroAnimation = useScrollAnimation()
  const philosophyAnimation = useScrollAnimation()
  const messageAnimation = useScrollAnimation()

  return (
    <div className="min-h-screen">
      <Header />

      <main id="main-content" className="pt-28 md:pt-32 pb-24">
        <section className="px-4">
          <div
            ref={heroAnimation.ref}
            className={`max-w-6xl mx-auto rounded-[2rem] md:rounded-[2.5rem] border border-blue-100/70 bg-gradient-to-br from-white via-blue-50/60 to-slate-100 p-8 md:p-14 shadow-[0_24px_80px_-40px_rgba(37,99,235,0.35)] transition-[opacity,transform] duration-1000 ${
              heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-sm tracking-[0.18em] uppercase text-blue-700 mb-5">About Us</p>
            <h1 className="text-4xl md:text-6xl font-light text-slate-900 leading-[1.12] text-balance max-w-4xl">
              価値を回す、
              <br className="hidden sm:block" />
              未来の歯車を創出
            </h1>
            <p className="mt-8 text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl">
              革新的なソリューションで、
              <br className="hidden sm:block" />
              お客様のビジネスを次のステージへ
            </p>

            <div className="mt-10 grid md:grid-cols-2 gap-5">
              <article className="rounded-2xl bg-white/90 border border-blue-100 p-6 md:p-8 shadow-sm">
                <p className="text-xs tracking-[0.14em] uppercase text-blue-700 mb-3">ビジョン</p>
                <h2 className="text-2xl md:text-3xl font-light text-slate-900 leading-snug text-balance">
                  {siteConfig.vision.statement}
                </h2>
              </article>
              <article className="rounded-2xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-sm">
                <p className="text-xs tracking-[0.14em] uppercase text-blue-200 mb-3">ミッション</p>
                <h2 className="text-2xl md:text-3xl font-light text-white leading-snug text-balance">
                  {siteConfig.mission.statement}
                </h2>
              </article>
            </div>
          </div>
        </section>

        <section className="px-4 mt-16 md:mt-20">
          <div
            ref={philosophyAnimation.ref}
            className={`max-w-6xl mx-auto transition-[opacity,transform] duration-1000 ${
              philosophyAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="mb-10 md:mb-12">
              <p className="text-sm tracking-[0.18em] uppercase text-blue-700 mb-3">Philosophy</p>
              <h2 className="text-3xl md:text-5xl font-light text-slate-900 text-balance">
                私たちが大切にする価値観
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-7">
              {siteConfig.philosophy.map((item, index) => {
                const paragraphs = item.description.split('\n')

                return (
                  <article
                    key={item.title}
                    className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 md:p-8 shadow-[0_20px_60px_-38px_rgba(15,23,42,0.45)]"
                  >
                    <div className="absolute -right-2 top-0 text-[5.5rem] leading-none font-light text-blue-100 select-none">
                      {index + 1}
                    </div>
                    <p className="text-sm text-slate-400 mb-3">{index + 1}</p>
                    <h3 className="text-2xl font-normal text-slate-900 mb-4 text-balance">{item.title}</h3>
                    <div className="space-y-3 text-slate-600 leading-relaxed">
                      {paragraphs.map((text) => (
                        <p key={text}>{text}</p>
                      ))}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-4 mt-16 md:mt-20">
          <div
            ref={messageAnimation.ref}
            className={`max-w-6xl mx-auto rounded-[2rem] border border-slate-200 bg-white p-8 md:p-12 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.6)] transition-[opacity,transform] duration-1000 ${
              messageAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-8">コーポレートメッセージ</h2>
            <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
              {siteConfig.corporateMessage.content.split('\n\n').map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-10 text-sm tracking-[0.12em] text-slate-400">株式会社コグミル</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

import type { Metadata } from "next"
import { Header } from "../components/header"
import { Footer } from "../components/footer"

export const metadata: Metadata = {
  title: "利用規約",
  description: "株式会社コグミルサイト利用に関する規約です。",
  alternates: { canonical: "/terms" },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200/60 rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-light text-slate-900 mb-8 font-[family-name:var(--font-display)]">利用規約</h1>
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>本サイトをご利用いただく際は、以下の条件に同意したものとみなします。</p>
            <section>
              <h2 className="text-2xl text-slate-900 mb-2">1. 禁止事項</h2>
              <p>法令違反、公序良俗に反する行為、当社または第三者に不利益を与える行為を禁止します。</p>
            </section>
            <section>
              <h2 className="text-2xl text-slate-900 mb-2">2. 免責事項</h2>
              <p>当社は、サイト情報の正確性維持に努めますが、完全性を保証するものではありません。</p>
            </section>
            <section>
              <h2 className="text-2xl text-slate-900 mb-2">3. 著作権</h2>
              <p>本サイトに掲載される文章・画像・ロゴなどの権利は、当社または正当な権利者に帰属します。</p>
            </section>
            <section>
              <h2 className="text-2xl text-slate-900 mb-2">4. 規約改定</h2>
              <p>本規約は、必要に応じて予告なく改定する場合があります。</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

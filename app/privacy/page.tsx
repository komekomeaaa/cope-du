import type { Metadata } from "next"
import { Header } from "../components/header"
import { Footer } from "../components/footer"

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "株式会社コグミルの個人情報保護方針について説明します。",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="pt-32 pb-24 px-4 bg-white/30">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-light text-gray-900 mb-8">プライバシーポリシー</h1>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              株式会社コグミル（以下、「当社」）は、お客様の個人情報を適切に取り扱い、法令に基づいて安全に管理します。
            </p>
            <section>
              <h2 className="text-2xl text-gray-900 mb-2">1. 取得する情報</h2>
              <p>お問い合わせ時に、氏名・メールアドレス・会社名・ご相談内容などを取得する場合があります。</p>
            </section>
            <section>
              <h2 className="text-2xl text-gray-900 mb-2">2. 利用目的</h2>
              <p>お問い合わせ対応、サービス提供、品質向上、重要なお知らせの配信に利用します。</p>
            </section>
            <section>
              <h2 className="text-2xl text-gray-900 mb-2">3. 第三者提供</h2>
              <p>法令に基づく場合を除き、ご本人の同意なく第三者へ提供しません。</p>
            </section>
            <section>
              <h2 className="text-2xl text-gray-900 mb-2">4. お問い合わせ窓口</h2>
              <p>個人情報に関するお問い合わせは、当社お問い合わせページよりご連絡ください。</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

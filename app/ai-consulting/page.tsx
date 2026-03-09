import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Brain, CheckCircle2, Cpu, Workflow } from "lucide-react"
import { Header } from "../components/header"
import { Footer } from "../components/footer"

export const metadata: Metadata = {
    title: "AIコンサルティング・業務改善支援",
    description: "机上の空論ではない、現場で実際に機能するAI活用・業務基盤構築を支援します。徹底したヒアリングから最適なツールの選定、導入・定着まで一気通貫で伴走します。",
}

export default function AIConsultingPage() {
  const valueProps = [
    {
      title: "既存業務の徹底分析",
      description:
        "現場業務を棚卸しし、AIや自動化で成果が出るポイントを優先度付きで整理します。",
      Icon: Workflow,
    },
    {
      title: "最適なツール選定と戦略設計",
      description:
        "目的と体制に合わせて、過不足のないツール構成と実行ロードマップを設計します。",
      Icon: Brain,
    },
    {
      title: "導入後の定着化支援",
      description:
        "PoCだけで終わらせず、運用ルール整備と社内教育まで含めて自走できる状態をつくります。",
      Icon: Cpu,
    },
  ]

  const processSteps = [
    {
      step: "01",
      title: "ヒアリング・課題整理",
      description: "業務フローと課題を可視化し、AI導入の目的を明確化します。",
    },
    {
      step: "02",
      title: "戦略立案・ROI設計",
      description: "効果指標を定義し、投資対効果を見ながら実行プランを策定します。",
    },
    {
      step: "03",
      title: "PoC実行・検証",
      description: "小さく試し、精度・運用負荷・改善余地を検証して本番に備えます。",
    },
    {
      step: "04",
      title: "本格導入・運用支援",
      description: "展開計画と教育支援で、現場定着まで伴走します。",
    },
  ]

  const outcomes = [
    "問い合わせ対応時間を最大40%削減",
    "文書検索と要約作業を半日から数分へ短縮",
    "提案書・企画書作成の品質と速度を標準化",
    "部署横断で再利用できるAI活用基盤を整備",
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <main id="main-content">
        <section className="pt-12 pb-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="text-sm font-medium text-cyan-700 bg-cyan-50 border border-cyan-200 px-4 py-2 rounded-md">
                AIコンサルティング
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 leading-tight text-balance font-[family-name:var(--font-display)]">
              AI活用を、
              <br className="hidden md:block" />
              現場で回る仕組みにする
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-4xl mx-auto">
              課題の整理から戦略設計、PoC、本格導入まで。机上の提案で終わらない伴走型のコンサルティングを提供します。
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-600/20"
              >
                無料相談を予約する
                <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-slate-700 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 transition-all"
              >
                事業案内へ戻る
              </Link>
            </div>
          </div>
        </section>

        <section className="pb-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-normal text-slate-900 mb-4 text-balance font-[family-name:var(--font-display)]">
                コンサルティングの提供価値
              </h2>
              <p className="text-xl text-slate-500">成果につながる3つの支援領域</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {valueProps.map((item) => (
                <Card key={item.title} className="bg-white border border-slate-200/60 shadow-sm h-full">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-lg bg-cyan-50 flex items-center justify-center mb-6">
                      <item.Icon aria-hidden="true" className="h-6 w-6 text-cyan-600" />
                    </div>
                    <h3 className="text-2xl font-normal text-slate-900 mb-3 text-balance font-[family-name:var(--font-display)]">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-normal text-slate-900 mb-10 text-center text-balance font-[family-name:var(--font-display)]">
              導入・定着までの進め方
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step) => (
                <Card key={step.step} className="bg-white border border-slate-200/60 shadow-sm h-full">
                  <CardContent className="p-6">
                    <p className="text-sm font-medium text-cyan-600 mb-3">STEP {step.step}</p>
                    <h3 className="text-xl text-slate-900 mb-3 text-balance">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-normal text-slate-900 mb-8 text-center text-balance font-[family-name:var(--font-display)]">
              期待できる成果
            </h2>
            <Card className="bg-white border border-slate-200/60 shadow-sm">
              <CardContent className="p-8 grid sm:grid-cols-2 gap-5">
                {outcomes.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-3 text-slate-600">
                    <CheckCircle2 aria-hidden="true" className="h-5 w-5 text-cyan-600 mt-0.5 shrink-0" />
                    <p>{outcome}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto rounded-2xl bg-slate-900 p-12 md:p-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6 text-balance font-[family-name:var(--font-display)]">
                次の一手を一緒に設計する
              </h2>
              <p className="text-xl text-slate-400 mb-8">
                まずは現状の業務課題を整理し、どこから始めるべきかを明確にします。
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/20"
              >
                無料相談・資料請求はこちら
                <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

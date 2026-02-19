'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { contactCategories, contactSchema, type ContactFormData } from "@/lib/contact/schema"

export default function ContactPage() {
  const [submitState, setSubmitState] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      company: "",
      name: "",
      email: "",
      phone: "",
      category: "サービス導入の相談",
      budget: "",
      message: "",
      consent: false,
      website: "",
      startedAt: Date.now().toString(),
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitState(null)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        setSubmitState({
          type: "error",
          message: data.message || "送信に失敗しました。時間をおいて再度お試しください。",
        })
        return
      }

      setSubmitState({ type: "success", message: data.message })
      form.reset({
        company: "",
        name: "",
        email: "",
        phone: "",
        category: "サービス導入の相談",
        budget: "",
        message: "",
        consent: false,
        website: "",
        startedAt: Date.now().toString(),
      })
    } catch {
      setSubmitState({
        type: "error",
        message: "通信エラーが発生しました。時間をおいて再度お試しください。",
      })
    }
  })

  return (
    <div className="min-h-screen">
      <Header />

      <main id="main-content" className="bg-white/30">
        <section className="pt-12 pb-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-8 text-balance">お問い合わせ</h1>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 pb-24">
              <Card className="border-0 shadow-xl overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-8 bg-gradient-to-br from-slate-50 via-white to-slate-50">
                  <CardTitle className="text-2xl sm:text-3xl font-light text-slate-900">ご相談フォーム</CardTitle>
                  <CardDescription className="text-slate-600 text-sm sm:text-base mt-2">
                    入力後に送信いただくと、通常1営業日以内に担当者からご連絡します。
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 sm:p-8">
                  <form onSubmit={onSubmit} className="space-y-6" noValidate>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">会社名</Label>
                        <Input
                          id="company"
                          type="text"
                          autoComplete="organization"
                          placeholder="例）株式会社コグミル"
                          {...form.register("company")}
                          aria-invalid={!!form.formState.errors.company}
                        />
                        {form.formState.errors.company && (
                          <p className="text-sm text-red-600">{form.formState.errors.company.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="name">お名前</Label>
                        <Input
                          id="name"
                          type="text"
                          autoComplete="name"
                          placeholder="例）山田 太郎"
                          {...form.register("name")}
                          aria-invalid={!!form.formState.errors.name}
                        />
                        {form.formState.errors.name && (
                          <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">メールアドレス</Label>
                        <Input
                          id="email"
                          type="email"
                          autoComplete="email"
                          inputMode="email"
                          spellCheck={false}
                          placeholder="例）info@cogmiru.com"
                          {...form.register("email")}
                          aria-invalid={!!form.formState.errors.email}
                        />
                        {form.formState.errors.email && (
                          <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">電話番号（任意）</Label>
                        <Input
                          id="phone"
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          placeholder="例）03-1234-5678"
                          {...form.register("phone")}
                          aria-invalid={!!form.formState.errors.phone}
                        />
                        {form.formState.errors.phone && (
                          <p className="text-sm text-red-600">{form.formState.errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">お問い合わせ種別</Label>
                        <select
                          id="category"
                          className="w-full h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
                          {...form.register("category")}
                          aria-invalid={!!form.formState.errors.category}
                        >
                          {contactCategories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        {form.formState.errors.category && (
                          <p className="text-sm text-red-600">{form.formState.errors.category.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="budget">ご予算感（任意）</Label>
                        <Input
                          id="budget"
                          type="text"
                          autoComplete="off"
                          {...form.register("budget")}
                          aria-invalid={!!form.formState.errors.budget}
                        />
                        {form.formState.errors.budget && (
                          <p className="text-sm text-red-600">{form.formState.errors.budget.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">お問い合わせ内容</Label>
                      <Textarea
                        id="message"
                        autoComplete="off"
                        rows={7}
                        {...form.register("message")}
                        aria-invalid={!!form.formState.errors.message}
                      />
                      {form.formState.errors.message && (
                        <p className="text-sm text-red-600">{form.formState.errors.message.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-start gap-3 rounded-lg border border-slate-200 p-4 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4"
                          {...form.register("consent")}
                          aria-invalid={!!form.formState.errors.consent}
                        />
                        <span className="text-sm text-slate-700 leading-relaxed">
                          個人情報の取り扱いに同意します。送信前に
                          <a href="/privacy" className="text-slate-900 underline hover:no-underline ml-1">
                            プライバシーポリシー
                          </a>
                          をご確認ください。
                        </span>
                      </label>
                      {form.formState.errors.consent && (
                        <p className="text-sm text-red-600">{form.formState.errors.consent.message}</p>
                      )}
                    </div>

                    <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...form.register("website")} />
                    <input type="hidden" {...form.register("startedAt")} />

                    <div aria-live="polite">
                      {submitState && (
                        <p
                          className={`mb-4 rounded-md px-4 py-3 text-sm ${
                            submitState.type === "success"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-red-50 text-red-700 border border-red-200"
                          }`}
                        >
                          {submitState.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="w-full h-12 text-base bg-slate-800 hover:bg-slate-700"
                    >
                      <Send className="h-4 w-4 mr-2" aria-hidden="true" />
                      {form.formState.isSubmitting ? "送信中…" : "送信する"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

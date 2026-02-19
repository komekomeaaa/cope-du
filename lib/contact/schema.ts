import { z } from "zod"

export const contactCategories = [
  "サービス導入の相談",
  "見積もり依頼",
  "既存運用の改善",
  "協業・パートナー",
  "採用関連",
  "その他",
] as const

export const contactSchema = z.object({
  company: z.string().min(1, "会社名を入力してください").max(120, "会社名は120文字以内で入力してください"),
  name: z.string().min(1, "お名前を入力してください").max(80, "お名前は80文字以内で入力してください"),
  email: z.string().email("メールアドレスの形式が正しくありません"),
  phone: z
    .string()
    .max(30, "電話番号は30文字以内で入力してください")
    .optional()
    .or(z.literal("")),
  category: z.enum(contactCategories, {
    message: "お問い合わせ種別を選択してください",
  }),
  budget: z
    .string()
    .max(80, "予算感は80文字以内で入力してください")
    .optional()
    .or(z.literal("")),
  message: z.string().min(20, "お問い合わせ内容は20文字以上で入力してください").max(3000, "3000文字以内で入力してください"),
  consent: z.boolean().refine((value) => value, {
    message: "個人情報の取り扱いに同意してください",
  }),
  website: z.string().optional(),
  startedAt: z.string(),
})

export type ContactFormData = z.infer<typeof contactSchema>

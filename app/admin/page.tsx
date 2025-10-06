'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // 既にログイン済みの場合は管理画面へ（クライアントサイドのみ）
    if (typeof window !== 'undefined') {
      const isAuthenticated = localStorage.getItem('adminAuthenticated')
      if (isAuthenticated === 'true') {
        router.push('/admin/news')
      }
    }
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // 簡易的なパスワード認証（本番環境では適切な認証システムを使用してください）
    const ADMIN_PASSWORD = 'admin123' // 本番環境では環境変数に設定

    if (password === ADMIN_PASSWORD) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminAuthenticated', 'true')
      }
      router.push('/admin/news')
    } else {
      setError('パスワードが正しくありません')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="text-center pb-8 pt-12">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-3xl font-light text-gray-900">
            管理者ログイン
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-12">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                パスワード
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="管理者パスワードを入力"
                className="border-gray-300 focus:border-blue-600"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium rounded-full"
            >
              {isLoading ? 'ログイン中...' : 'ログイン'}
            </Button>

            <p className="text-xs text-gray-500 text-center font-light">
              デフォルトパスワード: admin123<br />
              ※本番環境では必ず変更してください
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Mail, Phone, Building, Search, ArrowLeft, Eye, Archive } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'

interface Contact {
  id: number
  name: string
  email: string
  company: string
  phone: string
  service: string
  budget: string
  message: string
  date: string
  status: 'new' | 'replied' | 'archived'
}

const initialContacts: Contact[] = [
  {
    id: 1,
    name: "田中 太郎",
    email: "tanaka@example.com",
    company: "株式会社サンプル",
    phone: "03-1234-5678",
    service: "AI・機械学習ソリューション",
    budget: "500万円〜1000万円",
    message: "AIを活用した業務効率化システムの導入を検討しています。詳細な提案をお願いします。",
    date: "2024-01-15",
    status: 'new'
  },
  {
    id: 2,
    name: "佐藤 花子",
    email: "sato@company.co.jp",
    company: "テクノロジー株式会社",
    phone: "06-9876-5432",
    service: "クラウドインフラ構築",
    budget: "100万円〜500万円",
    message: "既存システムのクラウド移行について相談したいです。",
    date: "2024-01-14",
    status: 'replied'
  },
  {
    id: 3,
    name: "山田 次郎",
    email: "yamada@startup.com",
    company: "スタートアップ合同会社",
    phone: "090-1234-5678",
    service: "モバイルアプリ開発",
    budget: "100万円未満",
    message: "新規事業でモバイルアプリの開発を予定しています。",
    date: "2024-01-13",
    status: 'archived'
  }
]

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("すべて")
  const [selectedService, setSelectedService] = useState("すべて")
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    } else {
      router.push('/admin/login')
    }
  }, [router])

  const services = ["すべて", "AI・機械学習ソリューション", "クラウドインフラ構築", "モバイルアプリ開発", "データ分析・BI", "サイバーセキュリティ", "デジタルマーケティング"]
  const statuses = ["すべて", "new", "replied", "archived"]

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "すべて" || contact.status === selectedStatus
    const matchesService = selectedService === "すべて" || contact.service === selectedService
    return matchesSearch && matchesStatus && matchesService
  })

  const updateStatus = (id: number, newStatus: Contact['status']) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, status: newStatus } : contact
    ))
  }

  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case 'new': return 'bg-gradient-to-r from-red-500 to-pink-500'
      case 'replied': return 'bg-gradient-to-r from-green-500 to-emerald-500'
      case 'archived': return 'bg-gradient-to-r from-gray-500 to-slate-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: Contact['status']) => {
    switch (status) {
      case 'new': return '未対応'
      case 'replied': return '対応済み'
      case 'archived': return 'アーカイブ'
      default: return status
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">認証を確認中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  ダッシュボード
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  お問い合わせ管理
                </h1>
                <p className="text-gray-600">お客様からのお問い合わせ一覧</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                未対応: {contacts.filter(c => c.status === 'new').length}件
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-2 border-blue-100">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="名前、メール、会社名で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-blue-200 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-32 border-blue-200">
                    <SelectValue placeholder="ステータス" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === 'すべて' ? 'すべて' : getStatusText(status as Contact['status'])}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="w-48 border-blue-200">
                    <SelectValue placeholder="サービス" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contacts List */}
        <div className="space-y-4">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="bg-white/80 backdrop-blur-sm border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-bold text-xl text-gray-800">{contact.name}</h3>
                      <Badge className={`${getStatusColor(contact.status)} text-white`}>
                        {getStatusText(contact.status)}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <Mail className="h-4 w-4 mr-2 text-blue-500" />
                          {contact.email}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2 text-green-500" />
                          {contact.phone}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Building className="h-4 w-4 mr-2 text-purple-500" />
                          {contact.company}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-gray-600">
                          <span className="font-semibold">サービス:</span> {contact.service}
                        </div>
                        <div className="text-gray-600">
                          <span className="font-semibold">予算:</span> {contact.budget}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          {contact.date}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
                      <h4 className="font-semibold text-gray-800 mb-2">お問い合わせ内容:</h4>
                      <p className="text-gray-700 leading-relaxed">{contact.message}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-6">
                    {contact.status === 'new' && (
                      <Button
                        size="sm"
                        onClick={() => updateStatus(contact.id, 'replied')}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                      >
                        対応完了
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatus(contact.id, 'archived')}
                      className="border-gray-300 text-gray-600 hover:bg-gray-50"
                    >
                      <Archive className="h-4 w-4 mr-1" />
                      アーカイブ
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      詳細
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredContacts.length === 0 && (
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-100">
              <CardContent className="py-12 text-center">
                <p className="text-gray-500 text-lg">検索条件に一致するお問い合わせが見つかりませんでした。</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

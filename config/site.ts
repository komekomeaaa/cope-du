// ============================================
// サイト設定ファイル
// ============================================
// このファイルを編集してサイトの内容を変更できます
// エンジニアでなくても編集可能です！

export const siteConfig = {
  // 会社情報
  company: {
    name: "TechCorp",
    tagline: "未来をつくるテクノロジー",
    description: "革新的なソリューションで、お客様のビジネスを次のステージへ",
    foundedYear: "2010",
  },

  // 連絡先情報
  contact: {
    email: "info@techcorp.com",
    phone: "03-1234-5678",
    address: {
      postalCode: "〒160-0023",
      prefecture: "東京都",
      city: "新宿区西新宿",
      building: "新宿ビル10F"
    },
    businessHours: {
      weekday: "平日: 9:00 - 18:00",
      weekend: "土日祝: 休業"
    }
  },

  // ソーシャルメディア
  social: {
    twitter: "#",
    facebook: "#",
    linkedin: "#",
  },

  // お問い合わせフォーム設定
  contactForm: {
    // trueにすると埋め込みフォームを使用
    useEmbedForm: false,
    // Google FormsやTypeformのURLを設定
    embedUrl: "",
  },

  // 統計情報
  stats: [
    { number: "15+", label: "年の実績" },
    { number: "500+", label: "プロジェクト" },
    { number: "50+", label: "専門家" },
    { number: "24/7", label: "サポート" }
  ],

  // 会社の価値観
  values: [
    {
      icon: "💡",
      title: "革新性",
      description: "常に最新技術を追求し、革新的なソリューションを提供します"
    },
    {
      icon: "❤️",
      title: "顧客第一",
      description: "お客様の成功が私たちの成功。真のパートナーシップを築きます"
    },
    {
      icon: "⚡",
      title: "スピード",
      description: "迅速な対応と効率的な開発で、市場投入時間を短縮します"
    },
    {
      icon: "🌐",
      title: "グローバル",
      description: "世界基準の品質とサービスを、日本のお客様に提供します"
    }
  ],

  // 経営陣
  team: [
    {
      name: "田中 太郎",
      position: "CEO / Founder",
      image: "/ceo-portrait-professional.png",
      description: "15年以上のIT業界経験を持つ、テクノロジーとビジネスの架け橋"
    },
    {
      name: "佐藤 花子",
      position: "CTO",
      image: "/cto-female-tech-leader.png",
      description: "AI・機械学習分野のエキスパート。多数の特許を保有"
    },
    {
      name: "山田 次郎",
      position: "VP of Engineering",
      image: "/vp-engineering-portrait.png",
      description: "大規模システム開発のスペシャリスト。チームリーダーシップに長ける"
    }
  ],

  // ミッション
  mission: {
    title: "私たちのミッション",
    statement: "テクノロジーの力で、すべての企業が持つ可能性を最大限に引き出し、より良い未来を創造する",
    description: "私たちは、単なるシステム開発会社ではありません。お客様のビジネスパートナーとして、共に成長し、共に未来を創造していく存在でありたいと考えています。"
  }
}

// SaaS製品設定
export const saasProducts = [
  {
    id: 1,
    name: "AI Analytics Pro",
    tagline: "AIで経営を加速",
    description: "機械学習とビッグデータ分析で、ビジネスの意思決定を革新",
    icon: "🤖",
    features: [
      "リアルタイムデータ分析",
      "予測分析とレポート",
      "カスタマイズ可能なダッシュボード",
      "API連携"
    ],
    pricing: {
      starter: { name: "Starter", price: "¥9,800", period: "/月" },
      professional: { name: "Professional", price: "¥29,800", period: "/月" },
      enterprise: { name: "Enterprise", price: "お問い合わせ", period: "" }
    },
    popular: true
  },
  {
    id: 2,
    name: "Cloud Workspace",
    tagline: "チームの生産性を最大化",
    description: "クラウドベースのコラボレーションツールで、どこでも仕事ができる",
    icon: "☁️",
    features: [
      "リアルタイムコラボレーション",
      "ファイル共有とバージョン管理",
      "ビデオ会議機能",
      "プロジェクト管理"
    ],
    pricing: {
      starter: { name: "Starter", price: "¥4,980", period: "/月" },
      professional: { name: "Professional", price: "¥14,800", period: "/月" },
      enterprise: { name: "Enterprise", price: "お問い合わせ", period: "" }
    },
    popular: false
  },
  {
    id: 3,
    name: "Security Shield",
    tagline: "ビジネスを守る",
    description: "エンタープライズグレードのセキュリティで、データと資産を保護",
    icon: "🛡️",
    features: [
      "24/7セキュリティ監視",
      "脅威検知と対応",
      "コンプライアンス対応",
      "定期セキュリティレポート"
    ],
    pricing: {
      starter: { name: "Starter", price: "¥19,800", period: "/月" },
      professional: { name: "Professional", price: "¥49,800", period: "/月" },
      enterprise: { name: "Enterprise", price: "お問い合わせ", period: "" }
    },
    popular: false
  }
]

// SaaSの特徴
export const saasFeatures = [
  { 
    icon: "💰", 
    title: "低コストで導入", 
    desc: "初期費用を抑え、月額制で利用可能。予算に合わせた柔軟な料金プラン" 
  },
  { 
    icon: "🚀", 
    title: "迅速な導入", 
    desc: "クラウドベースで即座に利用開始。複雑なインストール作業は不要" 
  },
  { 
    icon: "🔄", 
    title: "自動アップデート", 
    desc: "常に最新機能を利用可能。メンテナンスや更新作業は不要" 
  },
  { 
    icon: "📈", 
    title: "スケーラブル", 
    desc: "ビジネスの成長に合わせて柔軟に拡張。リソースの増減も簡単" 
  },
  { 
    icon: "🔒", 
    title: "セキュリティ", 
    desc: "エンタープライズグレードのセキュリティとデータ保護を標準装備" 
  },
  { 
    icon: "🌐", 
    title: "どこからでもアクセス", 
    desc: "インターネット環境があれば、場所や端末を問わず利用可能" 
  }
]


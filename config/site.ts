// ============================================
// サイト設定ファイル
// ============================================
// このファイルを編集してサイトの内容を変更できます
// エンジニアでなくても編集可能です！

export const siteConfig = {
  // 会社情報
  company: {
    name: "Cogmiru Inc.",
    tagline: "価値を回す、\n未来の歯車を創出",
    description: "革新的なソリューションで、\nお客様のビジネスを次のステージへ",
    foundedYear: "2010",
  },

  // 連絡先情報
  contact: {
    email: "info@cogmiru.com",
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
    useEmbedForm: true,
    // Google FormsやTypeformのURLを設定
    embedUrl: "https://weak-earthquake-528.notion.site/ebd/29dd359167038091bd9dc11fffa0053f?appearance=light",
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


  // ビジョン
  vision: {
    title: "ビジョン",
    statement: "価値を回す、\n未来の歯車を創出"
  },

  // ミッション
  mission: {
    title: "ミッション",
    statement: "企業の生産性を最大化・最適化し、成長を駆動させる。"
  },

  // 哲学・バリュー（大切にする価値観）
  philosophy: [
    {
      title: "1.01の法則",
      description: "小さな歯車の回転が、やがて大きな力を生むように。\n毎日の小さな改善が、未来の大きな成果につながる。"
    },
    {
      title: "永遠の歯車",
      description: "Cogとして、社会に不可欠なインフラになる。\n止まることなく回り続け、社会を支える存在であり続ける。"
    },
    {
      title: "頼れる野心家",
      description: "着実な歯車（頼れる）と、未来を見る野心。\n確実性と挑戦心の両立で、信頼と革新を実現する。"
    }
  ],

  // コーポレートメッセージ
  corporateMessage: {
    title: "コーポレートメッセージ",
    content: "ビジネスの成長は、止まらない歯車から生まれる。\n\n株式会社コグミルは、その信念を「認知の歯車（Cognitive Gear）」で実現します。\n\n私たちのAIが持つ高度な認知（Cognitive）能力は、企業の生産性を飛躍的に向上させます。\n\n人が、人にしかできない、創造的な仕事に専念できる未来へ。\n\n私たちは、顧客と共に新しい景色を見る（Miru）ため、社会の成長を駆動させる、永遠の歯車（Cog）であり続けます。"
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


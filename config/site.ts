// ============================================
// サイト設定ファイル
// ============================================
// このファイルを編集してサイトの内容を変更できます
// エンジニアでなくても編集可能です！

export const siteConfig = {
  // 会社情報
  company: {
    name: "株式会社コグミル",
    tagline: "価値を回す、未来の歯車を創出",
    description: "革新的なソリューションで、お客様のビジネスを次のステージへ",
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
      icon: "Lightbulb",
      title: "革新性",
      description: "常に最新技術を追求し、革新的なソリューションを提供します"
    },
    {
      icon: "Heart",
      title: "顧客第一",
      description: "お客様の成功が私たちの成功。真のパートナーシップを築きます"
    },
    {
      icon: "Zap",
      title: "スピード",
      description: "迅速な対応と効率的な開発で、市場投入時間を短縮します"
    },
    {
      icon: "Globe",
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
    statement: "価値を回す、未来の歯車を創出"
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
    content: "ビジネスの成長は、止まらない歯車から生まれる。株式会社コグミルは、その信念を「認知の歯車（Cognitive Gear）」で実現します。\n\n私たちのAIが持つ高度な認知（Cognitive）能力は、企業の生産性を飛躍的に向上させます。\n\n人が、人にしかできない、創造的な仕事に専念できる未来へ。私たちは、顧客と共に新しい景色を見る（Miru）ため、社会の成長を駆動させる、永遠の歯車（Cog）であり続けます。"
  }
}

// SaaS製品設定
export const saasProducts = [
  {
    id: 1,
    name: "AIソリューション",
    tagline: "業務改善を一気通貫で支援",
    description: "現場課題の整理から設計・実装・運用まで伴走し、業務効率と意思決定速度を高めます",
    href: "/services",
    icon: "Bot",
    features: [
      "業務ヒアリングと要件整理",
      "AI活用フローの設計と実装",
      "既存システムとの連携設計",
      "運用定着までの改善サイクル支援"
    ],
    popular: true
  },
  {
    id: 2,
    name: "AIコンサルティング",
    tagline: "戦略設計から定着化まで伴走",
    description: "部門ごとの業務フローを分析し、最適なAI活用戦略・PoC・社内展開まで実務視点で支援します",
    href: "/ai-consulting",
    icon: "TrendingUp",
    features: [
      "業務棚卸しと課題の優先順位付け",
      "ROIを踏まえたAI導入戦略策定",
      "PoC設計と効果検証の実行支援",
      "定着化に向けた教育・運用設計"
    ],
    popular: false
  }
]

// SaaSの特徴
export const saasFeatures = [
  {
    icon: "CircleDollarSign",
    title: "低コストで導入",
    desc: "初期費用を抑え、月額制で利用可能。予算に合わせた柔軟な料金プラン"
  },
  {
    icon: "Rocket",
    title: "迅速な導入",
    desc: "クラウドベースで即座に利用開始。複雑なインストール作業は不要"
  },
  {
    icon: "RefreshCw",
    title: "自動アップデート",
    desc: "常に最新機能を利用可能。メンテナンスや更新作業は不要"
  },
  {
    icon: "TrendingUp",
    title: "スケーラブル",
    desc: "ビジネスの成長に合わせて柔軟に拡張。リソースの増減も簡単"
  },
  {
    icon: "ShieldCheck",
    title: "セキュリティ",
    desc: "エンタープライズグレードのセキュリティとデータ保護を標準装備"
  },
  {
    icon: "Globe",
    title: "どこからでもアクセス",
    desc: "インターネット環境があれば、場所や端末を問わず利用可能"
  }
]

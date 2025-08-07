import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

// ★★★ ここのパスを修正しました ★★★
// '@/...' という近道ではなく、直接的な道順（相対パス）で指定します
import { NewsProvider } from "../components/news-provider";

const fontSans = GeistSans;
const fontMono = GeistMono;

export const metadata: Metadata = {
  title: "TechCorp - 未来を創るテクノロジー",
  description: "革新的なソリューションで、お客様のビジネスを次のステージへ",
  generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} antialiased`}
      >
        <NewsProvider>
          {children}
        </NewsProvider>
      </body>
    </html>
  );
}

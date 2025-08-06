import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NewsProvider } from "./contexts/NewsContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NewsProvider>
          {children}
        </NewsProvider>
      </body>
    </html>
  );
}

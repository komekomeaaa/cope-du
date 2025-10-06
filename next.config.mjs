/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Cloudflare Pages対応（サーバーサイド機能を使用）
  // output: 'export', // 完全静的の場合のみコメント解除
}

export default nextConfig

'use client'

import { NewsProvider } from "../contexts/NewsContext"
import { BackgroundAnimation } from "./BackgroundAnimation"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackgroundAnimation />
      <div className="relative z-10">
        <NewsProvider>
          {children}
        </NewsProvider>
      </div>
    </>
  )
}


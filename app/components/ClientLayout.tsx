'use client'

import { NewsProvider } from "../contexts/NewsContext"
import { BackgroundAnimation } from "./BackgroundAnimation"
import { PageTransition } from "./PageTransition"
import { TopProgressBar } from "./TopProgressBar"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopProgressBar />
      <BackgroundAnimation />
      <div className="relative z-10">
        <NewsProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </NewsProvider>
      </div>
    </>
  )
}


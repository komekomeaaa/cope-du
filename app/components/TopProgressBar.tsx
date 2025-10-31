'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function TopProgressBar() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Start loading animation
    setIsLoading(true)
    setProgress(0)

    // Simulate progress
    const timer1 = setTimeout(() => setProgress(30), 50)
    const timer2 = setTimeout(() => setProgress(60), 150)
    const timer3 = setTimeout(() => setProgress(90), 300)
    
    // Complete progress
    const completeTimer = setTimeout(() => {
      setProgress(100)
      // Hide the bar after completion
      setTimeout(() => {
        setIsLoading(false)
        setProgress(0)
      }, 200)
    }, 500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(completeTimer)
    }
  }, [pathname])

  if (!isLoading && progress === 0) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] pointer-events-none"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-label="ページ読み込み中"
    >
      <div
        className="h-[3px] bg-blue-600 transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: progress < 100 ? '0 0 10px rgba(37, 99, 235, 0.5)' : 'none',
        }}
      />
    </div>
  )
}


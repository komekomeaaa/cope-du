'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionStage, setTransitionStage] = useState<'fade-in' | 'fade-out'>('fade-in')

  useEffect(() => {
    // Start fade out
    setTransitionStage('fade-out')
    
    const timer = setTimeout(() => {
      // Update content and start fade in
      setDisplayChildren(children)
      setTransitionStage('fade-in')
    }, 300) // Match with CSS transition duration

    return () => clearTimeout(timer)
  }, [pathname, children])

  return (
    <div
      className={`transition-opacity duration-300 ease-in-out ${
        transitionStage === 'fade-out' ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        willChange: 'opacity'
      }}
    >
      {displayChildren}
    </div>
  )
}


'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import 'easymde/dist/easymde.min.css'

// SimpleMDEをクライアントサイドのみで読み込む
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  label?: string
}

export function MarkdownEditor({ value, onChange, label = "本文（マークダウン）" }: MarkdownEditorProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <SimpleMDE
        value={value}
        onChange={onChange}
        options={{
          spellChecker: false,
          placeholder: 'マークダウン形式で記事を書いてください...',
          toolbar: [
            'bold',
            'italic',
            'heading',
            '|',
            'quote',
            'unordered-list',
            'ordered-list',
            '|',
            'link',
            'image',
            '|',
            'preview',
            'side-by-side',
            'fullscreen',
            '|',
            'guide',
          ],
          status: ['lines', 'words'],
          minHeight: '400px',
        }}
      />
    </div>
  )
}


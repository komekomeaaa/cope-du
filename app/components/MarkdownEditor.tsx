'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import dynamic from 'next/dynamic'
import 'easymde/dist/easymde.min.css'
import type SimpleMDEReact from 'react-simplemde-editor'

// SimpleMDEをクライアントサイドのみで読み込む
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
}) as typeof SimpleMDEReact

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  label?: string
}

export function MarkdownEditor({ value, onChange, label = "本文（マークダウン）" }: MarkdownEditorProps) {
  const [isMounted, setIsMounted] = useState(false)
  const editorRef = useRef<any>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // オプションをメモ化（再レンダリングを防ぐ）
  const editorOptions = useMemo(() => ({
    spellChecker: false,
    placeholder: 'マークダウン形式で記事を書いてください...\n\nショートカット:\n# 見出し1, ## 見出し2\n**太字** *斜体*\nCmd/Ctrl-B: 太字, Cmd/Ctrl-I: 斜体',
    toolbar: [
      'bold',
      'italic',
      'heading',
      'heading-1',
      'heading-2',
      'heading-3',
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
    shortcuts: {
      toggleBold: 'Cmd-B',
      toggleItalic: 'Cmd-I',
      toggleHeadingSmaller: 'Cmd-H',
      toggleHeadingBigger: 'Shift-Cmd-H',
      drawLink: 'Cmd-K',
      drawImage: 'Cmd-Alt-I',
      togglePreview: 'Cmd-P',
      toggleSideBySide: 'F9',
      toggleFullScreen: 'F11',
    },
    status: ['lines', 'words', 'cursor'],
    minHeight: '400px',
    autofocus: false,
    lineWrapping: true,
    tabSize: 2,
  }), [])

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
        key="markdown-editor"
        value={value}
        onChange={onChange}
        options={editorOptions}
        getMdeInstance={(instance) => {
          editorRef.current = instance
        }}
      />
    </div>
  )
}


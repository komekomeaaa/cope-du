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
    placeholder: 'ここに記事を書いてください...\n\n✏️ 書き方のヒント:\n# 大きな見出し\n## 中くらいの見出し\n**太字にしたい文字**\n*斜めの文字*',
    toolbar: [
      {
        name: 'bold',
        action: (editor: any) => {
          const cm = editor.codemirror
          const selection = cm.getSelection()
          cm.replaceSelection(`**${selection}**`)
        },
        className: 'fa fa-bold',
        title: '太字 (Cmd/Ctrl-B)',
      },
      {
        name: 'italic',
        action: (editor: any) => {
          const cm = editor.codemirror
          const selection = cm.getSelection()
          cm.replaceSelection(`*${selection}*`)
        },
        className: 'fa fa-italic',
        title: '斜体 (Cmd/Ctrl-I)',
      },
      '|',
      {
        name: 'heading-1',
        action: (editor: any) => {
          const cm = editor.codemirror
          const cursor = cm.getCursor()
          cm.replaceRange('# ', { line: cursor.line, ch: 0 })
        },
        className: 'fa fa-header fa-header-x fa-header-1',
        title: '大見出し',
      },
      {
        name: 'heading-2',
        action: (editor: any) => {
          const cm = editor.codemirror
          const cursor = cm.getCursor()
          cm.replaceRange('## ', { line: cursor.line, ch: 0 })
        },
        className: 'fa fa-header fa-header-x fa-header-2',
        title: '中見出し',
      },
      {
        name: 'heading-3',
        action: (editor: any) => {
          const cm = editor.codemirror
          const cursor = cm.getCursor()
          cm.replaceRange('### ', { line: cursor.line, ch: 0 })
        },
        className: 'fa fa-header fa-header-x fa-header-3',
        title: '小見出し',
      },
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
    status: [
      {
        className: 'lines',
        defaultValue: (el: any) => {
          el.innerHTML = '0 行'
        },
        onUpdate: (el: any) => {
          const cm = editorRef.current?.codemirror
          if (cm) {
            el.innerHTML = `${cm.lineCount()} 行`
          }
        },
      },
      {
        className: 'words',
        defaultValue: (el: any) => {
          el.innerHTML = '0 文字'
        },
        onUpdate: (el: any) => {
          const cm = editorRef.current?.codemirror
          if (cm) {
            const text = cm.getValue()
            el.innerHTML = `${text.length} 文字`
          }
        },
      },
      {
        className: 'cursor',
        defaultValue: (el: any) => {
          el.innerHTML = '1:1'
        },
        onUpdate: (el: any) => {
          const cm = editorRef.current?.codemirror
          if (cm) {
            const cursor = cm.getCursor()
            el.innerHTML = `${cursor.line + 1}:${cursor.ch + 1}`
          }
        },
      },
    ],
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
        options={editorOptions as any}
        getMdeInstance={(instance) => {
          editorRef.current = instance
        }}
      />
    </div>
  )
}


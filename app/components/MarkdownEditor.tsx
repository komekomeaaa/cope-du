'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
  const editorRef = useRef<any>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // オプションをメモ化（再レンダリングを防ぐ）
  const editorOptions = useMemo(() => ({
    spellChecker: false,
    placeholder: 'ここに記事本文を入力してください...\n\nマークダウン記法:\n# 見出し1\n## 見出し2\n**太字** *斜体* [リンク](URL)',
    toolbar: [
      {
        name: 'bold',
        action: (editor: any) => {
          const cm = editor.codemirror
          const selection = cm.getSelection()
          cm.replaceSelection(`**${selection}**`)
        },
        className: 'fa fa-bold',
        title: '太字',
      },
      {
        name: 'italic',
        action: (editor: any) => {
          const cm = editor.codemirror
          const selection = cm.getSelection()
          cm.replaceSelection(`*${selection}*`)
        },
        className: 'fa fa-italic',
        title: '斜体',
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
        title: '見出し1',
      },
      {
        name: 'heading-2',
        action: (editor: any) => {
          const cm = editor.codemirror
          const cursor = cm.getCursor()
          cm.replaceRange('## ', { line: cursor.line, ch: 0 })
        },
        className: 'fa fa-header fa-header-x fa-header-2',
        title: '見出し2',
      },
      {
        name: 'heading-3',
        action: (editor: any) => {
          const cm = editor.codemirror
          const cursor = cm.getCursor()
          cm.replaceRange('### ', { line: cursor.line, ch: 0 })
        },
        className: 'fa fa-header fa-header-x fa-header-3',
        title: '見出し3',
      },
      '|',
      'quote',
      'unordered-list',
      'ordered-list',
      '|',
      'link',
      'image',
      '|',
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
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === 'edit'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            編集
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === 'preview'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            プレビュー
          </button>
        </div>
      </div>
      
      {activeTab === 'edit' ? (
        <SimpleMDE
          key="markdown-editor"
          value={value}
          onChange={onChange}
          options={editorOptions as any}
          getMdeInstance={(instance) => {
            editorRef.current = instance
          }}
        />
      ) : (
        <div className="border border-gray-300 rounded-lg p-6 bg-white min-h-[400px]">
          {value ? (
            <div className="prose prose-lg max-w-none prose-headings:font-light prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-semibold prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-ul:list-disc prose-ol:list-decimal prose-li:text-gray-700">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {value}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>プレビューする内容がありません</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}


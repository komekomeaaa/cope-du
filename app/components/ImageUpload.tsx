'use client'

import { useState, useCallback } from 'react'
import { Upload, X, Image } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
  label?: string
}

export function ImageUpload({ value, onChange, label = "画像" }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find(file => 
      ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'].includes(file.type)
    )

    if (imageFile) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onChange(result)
      }
      reader.readAsDataURL(imageFile)
    }
  }, [onChange])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'].includes(file.type)) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onChange(result)
      }
      reader.readAsDataURL(file)
    }
  }, [onChange])

  const handleRemove = useCallback(() => {
    onChange('')
  }, [onChange])

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      
      {value ? (
        <div className="relative group">
          <img 
            src={value} 
            alt="プレビュー" 
            className="w-full h-48 object-cover rounded-lg border border-gray-200"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all rounded-lg flex items-center justify-center">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleRemove}
            >
              <X className="h-4 w-4 mr-1" />
              削除
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            isDragging 
              ? 'border-gray-400 bg-gray-50' 
              : 'border-gray-300 hover:border-gray-400 bg-white'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Image className={`h-10 w-10 mx-auto mb-3 transition-colors ${
            isDragging ? 'text-gray-900' : 'text-gray-400'
          }`} />
          <p className="text-sm text-gray-600 mb-1 font-medium">
            ドラッグ&ドロップで画像をアップロード
          </p>
          <p className="text-xs text-gray-500 mb-4">
            または
          </p>
          <label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/svg+xml"
              className="hidden"
              onChange={handleFileSelect}
            />
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              className="cursor-pointer"
              asChild
            >
              <span>
                ファイルを選択
              </span>
            </Button>
          </label>
          <p className="text-xs text-gray-400 mt-3">
            PNG, JPG, JPEG, SVG
          </p>
        </div>
      )}
    </div>
  )
}

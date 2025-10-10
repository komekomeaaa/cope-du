'use client'

import { useState, useCallback } from 'react'
import { Upload, X } from 'lucide-react'
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
      <label className="text-sm font-medium text-gray-700">{label}</label>
      
      {value ? (
        <div className="relative">
          <img 
            src={value} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-lg border border-gray-300"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 mb-2">
            ドラッグ&ドロップで画像をアップロード
          </p>
          <p className="text-xs text-gray-500 mb-4">
            対応形式: PNG, JPG, JPEG, SVG
          </p>
          <label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/svg+xml"
              className="hidden"
              onChange={handleFileSelect}
            />
            <Button type="button" variant="outline" asChild>
              <span className="cursor-pointer">
                ファイルを選択
              </span>
            </Button>
          </label>
        </div>
      )}
    </div>
  )
}


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
        <div className="relative group">
          <img 
            src={value} 
            alt="選んだ写真" 
            className="w-full h-64 object-cover rounded-2xl border-4 border-green-300 shadow-lg"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
            <Button
              type="button"
              variant="destructive"
              size="lg"
              className="rounded-full px-6 py-6 text-lg font-bold shadow-xl"
              onClick={handleRemove}
            >
              <X className="h-5 w-5 mr-2" />
              写真を削除
            </Button>
          </div>
          <div className="absolute top-3 left-3 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            ✓ 写真が選ばれています
          </div>
        </div>
      ) : (
        <div
          className={`border-4 border-dashed rounded-2xl p-12 text-center transition-all ${
            isDragging 
              ? 'border-blue-500 bg-blue-100 scale-105' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="mb-6">
            <Upload className={`h-20 w-20 mx-auto mb-4 transition-colors ${
              isDragging ? 'text-blue-500' : 'text-gray-400'
            }`} />
          </div>
          <p className="text-lg font-bold text-gray-700 mb-2">
            📸 写真をここに<span className="text-blue-600">ドラッグ</span>してね
          </p>
          <p className="text-base text-gray-600 mb-2">
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
              size="lg"
              className="cursor-pointer rounded-full px-8 py-6 text-base font-bold border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
              asChild
            >
              <span>
                📁 パソコンから写真を選ぶ
              </span>
            </Button>
          </label>
          <p className="text-xs text-gray-500 mt-4">
            使える写真: PNG, JPG, JPEG, SVG
          </p>
        </div>
      )}
    </div>
  )
}


'use client'

import { useState } from 'react'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export default function ImageUpload({ value, onChange, label = 'Upload Gambar' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(value)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      if (data.url) {
        onChange(data.url)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Gagal upload gambar')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      
      <div className="flex items-start gap-4">
        {/* Preview */}
        {preview && (
          <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200 flex-shrink-0">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Upload Button */}
        <div className="flex-1">
          <label className="cursor-pointer">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#d4af37] transition">
              {uploading ? (
                <div className="flex flex-col items-center">
                  <svg className="animate-spin h-8 w-8 text-[#d4af37] mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-sm text-gray-600">Uploading...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-2">📤</span>
                  <p className="text-sm text-gray-600 mb-1">Klik untuk upload gambar</p>
                  <p className="text-xs text-gray-400">PNG, JPG, GIF (Max 5MB)</p>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
          </label>

        </div>
      </div>
    </div>
  )
}

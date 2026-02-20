'use client'

import { useState, useRef } from 'react'

interface VideoUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export default function VideoUpload({ value, onChange, label = "Upload Video" }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('video/')) {
      alert('File harus berupa video!')
      return
    }

    // Check file size (max 50MB)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      alert('File terlalu besar! Maksimal 50MB. Silakan kompres video terlebih dahulu.')
      return
    }

    setUploading(true)
    
    try {
      console.log('VideoUpload: Processing file:', {
        name: file.name,
        type: file.type,
        size: file.size
      })
      
      // Upload video ke server
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      console.log('VideoUpload: Response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.error || `Upload failed with status ${response.status}`
        throw new Error(errorMessage)
      }
      
      const data = await response.json()
      
      if (!data.url) {
        throw new Error('No URL in response')
      }
      
      const videoUrl = data.url
      
      console.log('VideoUpload: Uploaded successfully:', videoUrl.substring(0, 100) + '...')
      
      onChange(videoUrl)
      console.log('VideoUpload: Successfully called onChange')
    } catch (error) {
      console.error('VideoUpload: Error uploading file:', error)
      const errorMessage = error instanceof Error ? error.message : 'Gagal mengupload video!'
      alert(`Upload gagal: ${errorMessage}`)
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        <span className="text-red-500 ml-1">*</span>
      </label>
      
      {value ? (
        <div className="space-y-4">
          {/* Video Preview */}
          <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200">
            <video
              src={value}
              controls
              className="w-full h-full object-cover"
              preload="metadata"
            />
          </div>
          
          {/* Video Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-green-800">Video berhasil dipilih</span>
            </div>
          </div>
          
          {/* Change Video Button */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 bg-[#2d5016] text-white rounded-lg hover:bg-[#3d6b1f] transition-colors text-sm font-medium disabled:opacity-50"
            >
              Ganti Video
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              disabled={uploading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
            >
              Hapus Video
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            dragActive 
              ? 'border-[#2d5016] bg-[#2d5016]/5' 
              : 'border-gray-300 hover:border-[#2d5016] hover:bg-gray-50'
          } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
        >
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#2d5016] to-[#3d6b1f] rounded-xl flex items-center justify-center mx-auto">
              {uploading ? (
                <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </div>
            
            <div>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                {uploading ? 'Mengupload Video...' : 'Upload Video'}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                {uploading ? 'Mohon tunggu...' : 'Drag & drop video atau klik untuk memilih'}
              </p>
              <p className="text-xs text-gray-400">
                Format yang didukung: MP4, WebM, AVI (Max: 50MB)
              </p>
            </div>
            
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2d5016] to-[#3d6b1f] text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Pilih Video
                </>
              )}
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      )}
    </div>
  )
}
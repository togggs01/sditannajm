import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    console.log('Upload file:', file.name, 'Size:', file.size, 'Type:', file.type)

    // Check file size based on type
    const isVideo = file.type.startsWith('video/')
    const maxSize = isVideo ? 50 * 1024 * 1024 : 5 * 1024 * 1024 // 50MB for video, 5MB for images
    
    if (file.size > maxSize) {
      const maxSizeMB = isVideo ? '50MB' : '5MB'
      return NextResponse.json({ 
        error: `File terlalu besar. Maksimal ${maxSizeMB}` 
      }, { status: 400 })
    }

    // Convert file to base64 for database storage
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    
    console.log('Base64 length:', base64.length, 'Type:', file.type)
    
    // Create data URL with mime type
    const mimeType = file.type || 'application/octet-stream'
    const dataUrl = `data:${mimeType};base64,${base64}`

    console.log('Upload success, returning data URL')

    return NextResponse.json({ 
      success: true, 
      url: dataUrl 
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Upload failed' 
    }, { status: 500 })
  }
}

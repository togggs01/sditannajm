import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: 'File terlalu besar. Maksimal 5MB' 
      }, { status: 400 })
    }

    console.log('Upload file:', file.name, 'Size:', file.size, 'Type:', file.type)

    // Convert file to base64 for database storage
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    
    console.log('Base64 length:', base64.length)
    
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

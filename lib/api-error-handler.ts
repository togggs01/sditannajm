import { NextResponse } from 'next/server'

export function handleApiError(error: unknown, context?: string) {
  console.error(`API Error${context ? ` in ${context}` : ''}:`, error)
  
  if (error instanceof Error) {
    return NextResponse.json(
      { 
        error: error.message,
        context: context || 'Unknown',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
  
  return NextResponse.json(
    { 
      error: 'Internal Server Error',
      context: context || 'Unknown',
      timestamp: new Date().toISOString()
    },
    { status: 500 }
  )
}

export function handleNotFound(resource: string) {
  return NextResponse.json(
    { error: `${resource} not found` },
    { status: 404 }
  )
}

export function handleBadRequest(message: string) {
  return NextResponse.json(
    { error: message },
    { status: 400 }
  )
}

export function handleUnauthorized() {
  return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 401 }
  )
}

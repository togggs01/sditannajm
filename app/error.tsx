'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Terjadi Kesalahan
          </h2>
          <p className="text-gray-600 mb-6">
            Maaf, terjadi kesalahan saat memuat halaman ini.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-red-50 border border-red-200 rounded p-4 mb-6 text-left">
              <p className="text-sm text-red-800 font-mono break-all">
                {error.message}
              </p>
            </div>
          )}
          <button
            onClick={reset}
            className="bg-[#2d5016] text-white px-6 py-3 rounded-lg hover:bg-[#3d6b1f] transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    </div>
  )
}

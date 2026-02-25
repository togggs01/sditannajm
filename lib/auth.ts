import { cookies } from 'next/headers'

export interface User {
  id: string
  username: string
  role: string
  loginTime?: number
}

// Role definitions
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  BERITA_GALERI_ADMIN: 'berita_galeri_admin',
  PPDB_ADMIN: 'ppdb_admin'
} as const

// Permission mapping
export const ROLE_PERMISSIONS: Record<string, string[]> = {
  [ROLES.SUPER_ADMIN]: ['dashboard', 'guru', 'berita', 'galeri', 'ppdb', 'gelombang-ppdb'],
  [ROLES.BERITA_GALERI_ADMIN]: ['dashboard', 'berita', 'galeri'],
  [ROLES.PPDB_ADMIN]: ['dashboard', 'ppdb', 'gelombang-ppdb']
}

export function hasPermission(role: string, page: string): boolean {
  const permissions = ROLE_PERMISSIONS[role]
  return permissions ? permissions.includes(page) : false
}

export function getAccessiblePages(role: string): string[] {
  return ROLE_PERMISSIONS[role] || []
}

export async function getSession(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')
    
    if (!session?.value) return null
    
    const user: User = JSON.parse(session.value)
    
    // Check if session has expired (24 hours)
    if (user.loginTime) {
      const now = Date.now()
      const sessionAge = now - user.loginTime
      const maxAge = 24 * 60 * 60 * 1000
      
      if (sessionAge > maxAge) {
        await clearSession()
        return null
      }
    }
    
    return user
  } catch (error) {
    console.error('getSession error:', error)
    return null
  }
}

export async function setSession(user: User): Promise<void> {
  try {
    const cookieStore = await cookies()
    
    const userWithTimestamp: User = {
      ...user,
      loginTime: Date.now()
    }
    
    cookieStore.set('session', JSON.stringify(userWithTimestamp), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/'
    })
  } catch (error) {
    console.error('setSession error:', error)
    throw error
  }
}

export async function clearSession(): Promise<void> {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('session')
  } catch (error) {
    console.error('clearSession error:', error)
  }
}

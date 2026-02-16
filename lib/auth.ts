import { cookies } from 'next/headers'

export interface User {
  id: string
  username: string
  role: string
  loginTime?: number // Timestamp when user logged in
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')
  
  if (!session) return null
  
  try {
    const user: User = JSON.parse(session.value)
    
    // Check if session has expired (24 hours)
    if (user.loginTime) {
      const now = Date.now()
      const sessionAge = now - user.loginTime
      const maxAge = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
      
      if (sessionAge > maxAge) {
        // Session expired, clear it
        await clearSession()
        return null
      }
    }
    
    return user
  } catch {
    return null
  }
}

export async function setSession(user: User) {
  const cookieStore = await cookies()
  
  // Add login timestamp
  const userWithTimestamp = {
    ...user,
    loginTime: Date.now()
  }
  
  cookieStore.set('session', JSON.stringify(userWithTimestamp), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 // 24 hours (1 day)
  })
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

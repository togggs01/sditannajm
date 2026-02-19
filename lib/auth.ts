import { cookies } from 'next/headers'

export interface User {
  id: string
  username: string
  role: string
  loginTime?: number
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

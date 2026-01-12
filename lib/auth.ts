import { cookies } from 'next/headers'

export interface User {
  id: string
  username: string
  role: string
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')
  
  if (!session) return null
  
  try {
    return JSON.parse(session.value)
  } catch {
    return null
  }
}

export async function setSession(user: User) {
  const cookieStore = await cookies()
  cookieStore.set('session', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

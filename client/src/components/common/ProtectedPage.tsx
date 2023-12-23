'use client'
import { setAuthorizationHeader } from '@/helper/setAuthorizationHeader'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

function ProtectedPage({ children }: { children: ReactNode }) {
  const userJSON = sessionStorage.getItem('user')
  const parsedUser = userJSON ? JSON.parse(userJSON) : null
  const router = useRouter()

  if (parsedUser) {
    setAuthorizationHeader(parsedUser.token)
  } else {
    router.replace('/sign-in')
  }

  return <>{children}</>
}

export default ProtectedPage

'use client'
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useUser } from '@/contexts/UserContext'
import { setAuthorizationHeader } from '@/helper/setAuthorizationHeader'

function ProtectedPage({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { setUserData } = useUser()

  useEffect(() => {
    const userJSON = sessionStorage.getItem('user')
    const parsedUser = userJSON ? JSON.parse(userJSON) : null

    if (parsedUser) {
      const {
        user: { id, name, email, password },
        token,
      } = parsedUser
      setAuthorizationHeader(parsedUser.token)
      setUserData(
        {
          id,
          user: name,
          email,
          password,
        },
        token,
      )
    } else {
      router.replace('/sign-in')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}

export default ProtectedPage

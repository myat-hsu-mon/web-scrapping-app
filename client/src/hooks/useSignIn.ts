import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import { setAuthorizationHeader } from '../helper/setAuthorizationHeader'
import request from '../config/request'
import { SignInProps, UserProps } from '@/interfaces/user'
import { useUser } from '@/contexts/UserContext'

interface useSignInResult {
  signIn: (signInData: SignInProps) => Promise<void>
  user: UserProps | null
  loading: boolean
  error: string | null
}

const useSignIn = (): useSignInResult => {
  const router = useRouter()
  const { setUserData } = useUser()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<UserProps | null>(null)

  const signIn = async (signInData: SignInProps) => {
    try {
      setLoading(true)
      const { data } = await request.post('/auths/sign-in', signInData)
      const { user, token } = data.data
      setUser(user)
      setAuthorizationHeader(token)
      setUserData(user, token)
      sessionStorage.setItem('user', JSON.stringify({ user, token }))
      router.replace('/')
    } catch (error: any) {
      toast.error(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  return { signIn, user, loading, error }
}

export default useSignIn

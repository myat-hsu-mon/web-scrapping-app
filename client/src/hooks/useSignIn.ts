import { useState } from 'react'

import request from '../config/request'
import { setAuthorizationHeader } from '../helper/setAuthorizationHeader'
import { SignInProps, UserProps } from '@/interfaces/user'

import { useRouter } from 'next/navigation'
import useSessionStorage from './useSessionStorage'

interface useSignInResult {
  signIn: (signInData: SignInProps) => Promise<void>
  user: UserProps | null
  loading: boolean
  error: string | null
}

const useSignIn = (): useSignInResult => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<UserProps | null>(null)

  const [, setSessionStorage] = useSessionStorage('user')

  const signIn = async (signInData: SignInProps) => {
    try {
      setLoading(true)
      const { data } = await request.post('/auths/sign-in', signInData)
      setUser(data.data.user)
      setAuthorizationHeader(data.data.token)
      setSessionStorage(data.data)
      router.replace('/')
    } catch (error: any) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  return { signIn, user, loading, error }
}

export default useSignIn

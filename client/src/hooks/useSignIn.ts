import { useState } from 'react'

import request from '../config/request'
import { setAuthorizationHeader } from '../helper/setAuthorizationHeader'
import { SignInProps, UserProps } from '@/interfaces/user'

interface useSignInResult {
  signIn: (signInData: SignInProps) => Promise<void>
  user: UserProps | null
  loading: boolean
  error: string | null
}

const useSignIn = (): useSignInResult => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<UserProps | null>(null)

  const signIn = async (signInData: SignInProps) => {
    try {
      setLoading(true)
      const { data } = await request.post('/auth/sign-in', signInData)
      setUser(data.data)
      setAuthorizationHeader(data.data.token)
    } catch (error: any) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  return { signIn, user, loading, error }
}

export default useSignIn

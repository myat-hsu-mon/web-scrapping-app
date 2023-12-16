import { useState } from 'react'

import request from '../config/request'
import { setAuthorizationHeader } from '../helper/setAuthorizationHeader'
import { SignUpProps, UserProps } from '@/interfaces/user'

interface useSignUpResult {
  signUp: (signUpData: SignUpProps) => Promise<void>
  user: UserProps | null
  loading: boolean
  error: string | null
}

const useSignUp = (): useSignUpResult => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<UserProps | null>(null)

  const signUp = async (signUpData: SignUpProps) => {
    try {
      setLoading(true)
      const { data } = await request.post('/auth/sign-up', signUpData)
      setUser(data.data)
      setAuthorizationHeader(data.data.token)
    } catch (error: any) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  return { signUp, user, loading, error }
}

export default useSignUp

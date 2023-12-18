import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import request from '../config/request'
import { setAuthorizationHeader } from '../helper/setAuthorizationHeader'
import { SignUpProps, UserProps } from '@/interfaces/user'

interface useSignUpResult {
  signUp: (signUpData: Omit<SignUpProps, 'confirmPassword'>) => Promise<void>
  user: UserProps | null
  loading: boolean
  error: string | null
}

const useSignUp = (): useSignUpResult => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<UserProps | null>(null)

  const signUp = async (signUpData: Omit<SignUpProps, 'confirmPassword'>) => {
    try {
      setLoading(true)
      const { data } = await request.post('/auths/sign-up', signUpData)
      setUser(data.data.user)
      setAuthorizationHeader(data.data.token)
      sessionStorage.setItem('user', data.data)
      router.replace('/')
    } catch (error: any) {
      toast(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  return { signUp, user, loading, error }
}

export default useSignUp

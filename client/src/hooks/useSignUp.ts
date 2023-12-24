import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import { SignUpProps, UserProps } from '@/interfaces/user'
import { setAuthorizationHeader } from '../helper/setAuthorizationHeader'
import request from '../config/request'
import { useUser } from '@/contexts/UserContext'

interface useSignUpResult {
  signUp: (signUpData: Omit<SignUpProps, 'confirmPassword'>) => Promise<void>
  user: UserProps | null
  loading: boolean
  error: string | null
}

const useSignUp = (): useSignUpResult => {
  const router = useRouter()
  const { setUserData } = useUser()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<UserProps | null>(null)

  const signUp = async (signUpData: Omit<SignUpProps, 'confirmPassword'>) => {
    try {
      setLoading(true)
      const { data } = await request.post('/auths/sign-up', signUpData)
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
  return { signUp, user, loading, error }
}

export default useSignUp

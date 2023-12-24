import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { KeywordProps } from '@/interfaces/keywords'
import { useUser } from '@/contexts/UserContext'
import request from '../config/request'

const useKeywordsByUserId = () => {
  const [keywords, setKeywords] = useState<KeywordProps[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { user } = useUser()

  useEffect(() => {
    const fetchKeywordsByUserId = async (id: number) => {
      try {
        const response = await request.get(`/users/${id}/keywords`)
        setKeywords(response.data.data)
      } catch (error: any) {
        toast.error(error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    if (user?.id) {
      fetchKeywordsByUserId(user.id)
    }
  }, [user?.id])

  return { keywords, setKeywords, loading, error }
}

export default useKeywordsByUserId

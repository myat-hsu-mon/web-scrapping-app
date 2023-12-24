import { useState } from 'react'

import { KeywordPropsWithResult } from '@/interfaces/keywords'
import { toast } from 'react-toastify'
import request from '../config/request'

const useKeywordDetail = () => {
  const [keyword, setKeyword] = useState<KeywordPropsWithResult>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchKeywordDetail = async (keywordId: number) => {
    try {
      const response = await request.get(`/keywords/${keywordId}`)
      setKeyword(response.data.data)
    } catch (error: any) {
      toast.error(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return { keyword, setKeyword, fetchKeywordDetail, loading, error }
}

export default useKeywordDetail

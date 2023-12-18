import { useState } from 'react'

import request from '../config/request'
import { toast } from 'react-toastify'

const useKeywordDetail = () => {
  const [keyword, setKeyword] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchKeywordDetail = async (keywordId: number) => {
    try {
      const response = await request.get(`/keywords/${keywordId}`)
      setKeyword(response.data.data)
    } catch (error: any) {
      toast(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return { keyword, setKeyword, fetchKeywordDetail, loading, error }
}

export default useKeywordDetail

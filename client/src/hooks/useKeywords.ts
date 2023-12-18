import { useState, useEffect } from 'react'

import request from '../config/request'

const useKeywords = () => {
  const [keywords, setKeywords] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await request.get('/keywords')
        setKeywords(response.data.data)
      } catch (error: any) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchKeywords()
  }, [])

  return { keywords, loading, error }
}

export default useKeywords

import { useState, useEffect } from 'react'

import request from '../config/request'

const useResultsByKeywordId = () => {
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResultsByKeywordId = async () => {
      try {
        const response = await request.get('/results')
        setResults(response.data.data)
      } catch (error: any) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchResultsByKeywordId()
  }, [])

  return { results, loading, error }
}

export default useResultsByKeywordId

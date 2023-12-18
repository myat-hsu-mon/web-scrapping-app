import { useState } from 'react'

import request from '../config/request'

interface FileUploadResult {
  uploadFile: (formData: FormData) => Promise<void>
  loading: boolean
  error: string | null
}

const useFileUpload = (): FileUploadResult => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadFile = async (formData: FormData) => {
    try {
      setLoading(true)
      await request.post('/upload', formData)
    } catch (error: any) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  return { uploadFile, loading, error }
}

export default useFileUpload

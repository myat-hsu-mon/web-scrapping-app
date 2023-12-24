import { Dispatch, SetStateAction, useState } from 'react'

import { KeywordProps } from '@/interfaces/keywords'
import { toast } from 'react-toastify'
import request from '../config/request'

interface FileUploadResult {
  uploadFile: (formData: FormData) => Promise<void>
  loading: boolean
  error: string | null
}

const useFileUpload = ({
  setKeywords,
}: {
  setKeywords: Dispatch<SetStateAction<KeywordProps[]>>
}): FileUploadResult => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadFile = async (formData: FormData) => {
    try {
      setLoading(true)
      const response = await request.post('/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setKeywords((prev) => [...response.data.data, ...prev])
    } catch (error: any) {
      toast.error(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  return { uploadFile, loading, error }
}

export default useFileUpload

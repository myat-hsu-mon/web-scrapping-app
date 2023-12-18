'use client'

import useFileUpload from '@/hooks/useFileUpload'
import { useForm, Controller } from 'react-hook-form'
import { Button } from './common/Button'
import { Dispatch, SetStateAction } from 'react'

interface FormData {
  file: any
}

const FileUpload = ({
  setKeywords,
}: {
  setKeywords: Dispatch<SetStateAction<string[]>>
}) => {
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>()
  const { uploadFile, loading, error } = useFileUpload({ setKeywords })

  // const onSubmit = async (data: FormData) => {
  //   // Handle file submission logic here
  //   const formData = new FormData()
  //   formData.append('file', data.file[0])
  // }

  const handleFileChange = async (e: any) => {
    try {
      e.preventDefault()
      console.log('inside handleFileChange')
      const formData = new FormData()
      formData.append('csv', e.target.files[0])
      console.log('csv: ', formData.get('csv'))
      uploadFile(formData)
    } catch (error) {
      console.error('File upload failed:', error)
    }
  }
  const onSubmit = (data: any) => {
    console.log({ data })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex max-w-3xl flex-col items-center pt-9"
    >
      <label
        htmlFor="file"
        className="cursor-pointer rounded-md border border-dashed border-gray-200 px-36 py-24"
      >
        <Controller
          name="file"
          control={control}
          rules={{
            required: 'File is required',
            validate: (value) => {
              if (value[0] && !value[0].name.endsWith('.csv')) {
                return 'File must be a CSV file'
              }
              return true
            },
          }}
          render={({ field }) => (
            <div>
              <input
                {...field}
                type="file"
                id="file"
                accept=".csv"
                className="hidden appearance-none  rounded-t-md border border-dashed bg-gray-200 px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                onChange={(e) => {
                  field.onChange(e)
                  handleFileChange(e)
                }}
              />
            </div>
          )}
        />
        <div className="flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-100">
            <FileUploadIcon />
          </div>
        </div>
        <div className="mt-4 text-center text-gray-500">
          Click to browse (CSV file)
        </div>
      </label>
      <Button type="submit">Submit</Button>
    </form>
  )
}

const FileUploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#06b6d4"
    width="40px"
    height="40px"
    viewBox="0 0 24 24"
  >
    <path d="M12.71,11.29a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-2,2a1,1,0,0,0,1.42,1.42l.29-.3V17a1,1,0,0,0,2,0V14.41l.29.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42ZM20,8.94a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19l-.1,0A1.1,1.1,0,0,0,13.06,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V9S20,9,20,8.94ZM14,5.41,16.59,8H15a1,1,0,0,1-1-1ZM18,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4h5V7a3,3,0,0,0,3,3h3Z" />
  </svg>
)

export default FileUpload

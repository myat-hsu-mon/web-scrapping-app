'use client'

import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'

interface FormData {
  file: any
}

const FileUpload = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    // Handle file submission logic here
    const formData = new FormData()
    formData.append('file', data.file[0])
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex max-w-3xl flex-col items-center pt-9"
    >
      <label htmlFor="file" className="shadow-md">
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
                className="focus:shadow-outline appearance-none rounded-t-md border border-cyan-500 px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                onChange={field.onChange}
              />
            </div>
          )}
        />

        <div className="rounded-b-md bg-cyan-500 px-6 py-2 text-center text-white">
          Upload A CSV File For WebScrapping
        </div>
      </label>
    </form>
  )
}

export default FileUpload

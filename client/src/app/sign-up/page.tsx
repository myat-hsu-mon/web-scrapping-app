'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@/components/Button'
import Link from 'next/link'
import ErrorMessage from '@/components/ErrorMessage'
import { SignUpProps } from '@/interfaces/user'


export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignUpProps>()

  const onSubmit: SubmitHandler<SignUpProps> = async (data) => {
    console.log(data)
  }

  const validatePasswordMatch = (value: string) => {
    const password = watch('password')
    return value === password || 'Passwords do not match'
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-cyan-900">
          Sign Up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-cyan-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  {...register('name', { required: 'Full Name is required' })}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-cyan-900 shadow-sm ring-1 ring-inset ring-cyan-300 placeholder:text-cyan-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage message={errors.name?.message} />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-cyan-900"
              >
                Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email', {
                    required: 'Email Address is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-cyan-900 shadow-sm ring-1 ring-inset ring-cyan-300 placeholder:text-cyan-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage message={errors.email?.message} />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-cyan-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password should be at least 6 characters long',
                    },
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-cyan-900 shadow-sm ring-1 ring-inset ring-cyan-300 placeholder:text-cyan-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage message={errors.password?.message} />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-cyan-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    required: 'Confirm Password is required',
                    validate: validatePasswordMatch,
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-cyan-900 shadow-sm ring-1 ring-inset ring-cyan-300 placeholder:text-cyan-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage message={errors.confirmPassword?.message} />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>

            <p className="mt-10 text-center text-sm text-cyan-500">
              Already have an account?{' '}
              <Link
                href="/sign-in"
                className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

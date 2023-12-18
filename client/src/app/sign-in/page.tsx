'use client'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Button } from '@/components/common/Button'
import ErrorMessage from '@/components/common/ErrorMessage'
import { SignInProps } from '@/interfaces/user'
import useSignIn from '@/hooks/useSignIn'

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignInProps>()
  const { signIn, user, loading, error } = useSignIn()

  const onSubmit: SubmitHandler<SignInProps> = async (data) => {
    signIn(data)
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-cyan-900">
          Sign In
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                  autoComplete="off"
                  className="block w-full rounded-md border-0 bg-gray-100 py-1.5 text-cyan-900 shadow-sm placeholder:text-cyan-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 bg-gray-100 py-1.5 text-cyan-900 shadow-sm placeholder:text-cyan-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage message={errors.password?.message} />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </div>

            <p className="mt-10 text-center text-sm text-cyan-500">
              Not have an account?{' '}
              <Link
                href="/sign-up"
                className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

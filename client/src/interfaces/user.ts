export interface UserProps {
  name: string
  email: string
  token: string
}

export interface SignUpProps {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface SignInProps {
  email: string
  password: string
}

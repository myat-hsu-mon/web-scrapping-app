export interface UserProps {
  name: string
  email: string
  token: string
}
export interface SignInProps {
  email: string
  password: string
}
export interface SignUpProps extends SignInProps {
  name: string
  confirmPassword: string
}

'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface UserData {
  id: number
  user: string
  email: string
  password: string
}

interface UserContextProps {
  user: UserData | null
  token: string | null
  setUserData: (userData: UserData, userToken: string) => void
  clearUserData: () => void
}

export const UserContext = createContext<UserContextProps | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const setUserData = (userData: UserData, userToken: string) => {
    setUser(userData)
    setToken(userToken)
  }

  const clearUserData = () => {
    setUser(null)
    setToken(null)
  }

  const contextValue: UserContextProps = {
    user,
    token,
    setUserData,
    clearUserData,
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

const useUser = (): UserContextProps => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export { UserProvider, useUser }

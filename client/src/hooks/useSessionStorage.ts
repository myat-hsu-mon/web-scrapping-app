import { useState } from 'react'

const useSessionStorage = (key: string) => {
  const currentValue = sessionStorage.getItem(key)
  const storedValue = currentValue ? JSON.parse(currentValue) : null

  const [value, setValue] = useState(storedValue)

  const setStoredValue = (newValue: any) => {
    const newValueToStore =
      typeof newValue === 'function' ? newValue(value) : newValue

    setValue(newValueToStore)

    sessionStorage.setItem(key, JSON.stringify(newValueToStore))
  }

  return [value, setStoredValue]
}

export default useSessionStorage

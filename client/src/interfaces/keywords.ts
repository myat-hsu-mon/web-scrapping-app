import { SearchResultProps } from './searchResult'

export interface KeywordProps {
  id: number
  name: string
  userId: number
}

export interface KeywordPropsWithResult {
  result: SearchResultProps | null
  id: number
  name: string
  userId: number
}

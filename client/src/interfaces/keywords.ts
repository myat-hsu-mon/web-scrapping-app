import { SearchResultProps } from './searchResult'

export interface KeywordProps {
  id: number
  name: string
  userId: number
}

export interface KeywordPropsWithResult extends KeywordProps {
  result: SearchResultProps | null
}

'use client'
import { useEffect, useState } from 'react'

import KeywordBadge from './KeywordBadge'
import { KeywordProps } from '@/interfaces/keywords'

const KeywordsList = ({
  keywords,
  fetchKeywordDetail,
}: {
  keywords: KeywordProps[]
  fetchKeywordDetail: (id: number) => Promise<void>
}) => {
  const [activeBadge, setActiveBadge] = useState<KeywordProps>(keywords[0])

  const handleActiveBadge = (keyword: KeywordProps) => {
    setActiveBadge(keyword)
    fetchKeywordDetail(keyword.id)
  }

  useEffect(() => {
    fetchKeywordDetail(activeBadge.id)
  }, [])

  return (
    <div className="max-h-64 overflow-y-auto rounded-md border border-gray-200 p-6">
      <ul className="flex flex-wrap gap-2" data-testid="keywords-list">
        {keywords.map((keyword) => (
          <KeywordBadge
            handleActiveBadge={() => handleActiveBadge(keyword)}
            isActive={activeBadge.id === keyword.id}
            keyword={keyword.name}
            key={keyword.id}
          />
        ))}
      </ul>
    </div>
  )
}

export default KeywordsList

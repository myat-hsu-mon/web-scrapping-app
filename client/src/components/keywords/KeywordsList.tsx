'use client'
import { useState } from 'react'

import KeywordBadge from './KeywordBadge'
import { KeywordProps } from '@/interfaces/keywords'

const KeywordsList = ({
  keywords,
  fetchKeywordDetail,
}: {
  keywords: KeywordProps[]
  fetchKeywordDetail: (id: number) => Promise<void>
}) => {
  const [activeBadge, setActiveBadge] = useState<null | number>(null)

  const handleActiveBadge = (keyword: KeywordProps, index: number) => {
    setActiveBadge(index)
    fetchKeywordDetail(keyword.id)
  }

  return (
    <div className="max-h-64 overflow-y-auto rounded-md border border-gray-200 p-6">
      <ul className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <KeywordBadge
            handleActiveBadge={() => handleActiveBadge(keyword, index)}
            isActive={activeBadge === index}
            keyword={keyword.name}
            key={index}
          />
        ))}
      </ul>
    </div>
  )
}

export default KeywordsList

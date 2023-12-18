'use client'
import { useState } from 'react'
import KeywordBadge from './KeywordBadge'

const KeywordsList = ({ keywords }: { keywords: string[] }) => {
  const [activeBadge, setActiveBadge] = useState(0)

  const handleActiveBadge = (index: number) => {
    setActiveBadge(index)
  }
  return (
    <div className="max-h-64 overflow-y-auto rounded-md border border-gray-200 p-6">
      <ul className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <KeywordBadge
            handleActiveBadge={() => handleActiveBadge(index)}
            isActive={activeBadge === index}
            keyword={keyword}
            key={index}
          />
        ))}
      </ul>
    </div>
  )
}

export default KeywordsList

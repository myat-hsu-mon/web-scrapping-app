import KeywordBadge from './KeywordBadge'

const KeywordsList = ({ keywords }: { keywords: string[] }) => {
  return (
    <div className="max-h-64 overflow-x-auto rounded-md border border-cyan-500 p-4">
      <ul className="flex flex-wrap space-x-2 space-y-2">
        {keywords.map((keyword, index) => (
          <KeywordBadge keyword={keyword} key={index} />
        ))}
      </ul>
    </div>
  )
}

export default KeywordsList

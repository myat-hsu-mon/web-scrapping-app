import clsx from 'clsx'

export default function KeywordBadge({
  keyword,
  isActive = false,
}: {
  keyword: string
  isActive?: boolean
}) {
  return (
    <li
      className={clsx(
        'whitespace-nowrap rounded-md border border-cyan-500 px-2 py-1 text-sm',
        {
          'bg-cyan-500 text-white': isActive,
          'bg-cyan-50 text-gray-900': !isActive,
        },
      )}
    >
      {keyword}
    </li>
  )
}

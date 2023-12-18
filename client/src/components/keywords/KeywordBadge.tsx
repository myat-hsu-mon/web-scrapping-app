import clsx from 'clsx'

export default function KeywordBadge({
  keyword,
  isActive = false,
  handleActiveBadge,
}: {
  keyword: string
  isActive?: boolean
  handleActiveBadge: () => void
}) {
  return (
    <li
      onClick={handleActiveBadge}
      className={clsx(
        'cursor-pointer rounded-md bg-cyan-500 px-3 py-2 text-sm text-white',
        {
          'bg-cyan-800': isActive,
        },
      )}
    >
      {keyword}
    </li>
  )
}

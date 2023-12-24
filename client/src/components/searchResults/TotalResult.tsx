export default function TotalResult({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <p className="mb-2 ml-2 block rounded-md bg-gray-200 px-3 py-2 text-sm text-gray-600">
      <span>{label} - </span> <span>{value}</span>
    </p>
  )
}

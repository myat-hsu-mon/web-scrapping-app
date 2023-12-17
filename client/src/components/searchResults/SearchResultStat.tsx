const stats = [
  { id: 1, name: 'Total Number of Ads Words', value: '8,000+' },
  { id: 2, name: 'Total Number of Links', value: '100' },
  { id: 3, name: 'Total Search Results', value: '916,000' },
  { id: 4, name: 'Milliseconds', value: '0.6ms' },
]

export default function SearchResultStat() {
  return (
    <div className="bg-white">
      <dl className="grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
            <dt className="text-sm font-semibold leading-6 text-gray-600">
              {stat.name}
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

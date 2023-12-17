import LoadingSpinner from '../common/LoadingSpinner'

export default function ProcessingResultsMessage() {
  return (
    <div className="rounded-md bg-cyan-50 p-8 shadow-sm">
      <h2 className="mb-4 text-xl font-bold uppercase">
        Processing Search Results
      </h2>
      <p className="mb-2 text-gray-500">
        The search results for the specific keyword are currently being
        processed.
      </p>
      <p className="mb-2 text-gray-500">
        Please wait a moment and try again later. Thank you for your patience!
      </p>
      <LoadingSpinner />
    </div>
  )
}

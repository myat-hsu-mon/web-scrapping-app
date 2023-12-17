const NoKeywordsMessage = () => {
  return (
    <div className="rounded-md shadow-sm bg-cyan-50 p-8">
      <h2 className="mb-4 text-xl font-bold uppercase">No Uploaded Keywords</h2>
      <p className="mb-2 text-gray-500">
        It seems you have not uploaded any keywords yet. You can upload a CSV
        file containing keywords to initiate web scraping on Google.
      </p>
      <p className="text-gray-500">
        Upload a CSV file with your keywords and start exploring search results!
      </p>
    </div>
  )
}

export default NoKeywordsMessage

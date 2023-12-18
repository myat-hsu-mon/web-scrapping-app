'use client'
import FileUpload from '@/components/FileUpload'
import KeywordsList from '@/components/keywords/KeywordsList'
import NoKeywordsMessage from '@/components/keywords/NoKeywordsMessage'
import HTMLRender from '@/components/searchResults/HTMLRender'
import ProcessingResultsMessage from '@/components/searchResults/ProcessingResultsMessage'
import useSessionStorage from '@/hooks/useSessionStorage'
import { useState } from 'react'

export default function Home() {
  const [sessionValue] = useSessionStorage('user')
  console.log({ sessionValue })
  //useKeywords
  //getSearchResultsbyKeywordId

  const isProcessed = true
  const [keywords, setKeywords] = useState<string[]>([])

  return (
    <main className="m-auto flex min-h-screen max-w-7xl flex-col space-y-6 bg-white p-6">
      <FileUpload setKeywords={setKeywords} />
      {keywords.length === 0 ? (
        <NoKeywordsMessage />
      ) : (
        <div>
          <div className="flex items-center">
            <p className="mb-2 text-sm text-gray-500">
              About 20,460,000,000 results (0.39 ms)
            </p>
            <p className="mb-2 ml-auto block rounded-md bg-gray-200 px-3 py-2 text-sm text-gray-600">
              <span>Total Links - </span> 8000
            </p>
            <p className="mb-2 ml-2 block rounded-md bg-gray-200 px-3 py-2 text-sm text-gray-600">
              <span>Total AdWords - </span> 300
            </p>
          </div>
          <KeywordsList keywords={keywords} />
        </div>
      )}
      {!isProcessed ? <ProcessingResultsMessage /> : <HTMLRender />}
    </main>
  )
}

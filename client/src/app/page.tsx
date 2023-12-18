'use client'
import { useRouter } from 'next/navigation'
import FileUpload from '@/components/FileUpload'
import KeywordsList from '@/components/keywords/KeywordsList'
import NoKeywordsMessage from '@/components/keywords/NoKeywordsMessage'
import HTMLRender from '@/components/searchResults/HTMLRender'
import ProcessingResultsMessage from '@/components/searchResults/ProcessingResultsMessage'
import { useUser } from '@/contexts/UserContext'
import useKeywordDetail from '@/hooks/useKeywordDetail'
import useKeywordsByUserId from '@/hooks/useKeywordsByUserId'

export default function Home() {
  const { keywords, setKeywords } = useKeywordsByUserId()
  const { keyword, fetchKeywordDetail } = useKeywordDetail()
  const router = useRouter()

  const { user } = useUser()
  if (!user) {
    router.replace('/sign-in')
  }

  return (
    <main className="m-auto flex min-h-screen max-w-7xl flex-col space-y-6 bg-white p-6">
      <FileUpload setKeywords={setKeywords} />
      {keywords.length === 0 ? (
        <NoKeywordsMessage />
      ) : (
        <div>
          {keyword?.result && (
            <div className="flex items-center">
              <p className="mb-2 text-sm text-gray-500">
                {keyword?.result?.searchResults}
              </p>
              <p className="mb-2 ml-auto block rounded-md bg-gray-200 px-3 py-2 text-sm text-gray-600">
                <span>Total Links - </span>{' '}
                <span>{keyword?.result?.totalLinks}</span>
              </p>
              <p className="mb-2 ml-2 block rounded-md bg-gray-200 px-3 py-2 text-sm text-gray-600">
                <span>Total AdWords - </span> {keyword?.result?.totalAdWords}
              </p>
            </div>
          )}

          <KeywordsList
            keywords={keywords}
            fetchKeywordDetail={fetchKeywordDetail}
          />
        </div>
      )}
      {!keyword?.result ? (
        <ProcessingResultsMessage />
      ) : (
        <HTMLRender htmlCode={keyword?.result.htmlCode} />
      )}
    </main>
  )
}

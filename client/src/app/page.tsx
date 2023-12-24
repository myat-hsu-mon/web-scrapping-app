'use client'
import FileUpload from '@/components/FileUpload'
import HTMLRender from '@/components/searchResults/HTMLRender'
import KeywordsList from '@/components/keywords/KeywordsList'
import NoKeywordsMessage from '@/components/keywords/NoKeywordsMessage'
import ProcessingResultsMessage from '@/components/searchResults/ProcessingResultsMessage'
import ProtectedPage from '@/components/common/ProtectedPage'
import TotalResult from '@/components/searchResults/TotalResult'
import useKeywordDetail from '@/hooks/useKeywordDetail'
import useKeywordsByUserId from '@/hooks/useKeywordsByUserId'
import { Button } from '@/components/common/Button'
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/UserContext'

export default function Home() {
  const { keywords, setKeywords } = useKeywordsByUserId()
  const { keyword, fetchKeywordDetail } = useKeywordDetail()

  const router = useRouter()
  const { clearUserData } = useUser()

  const result = keyword?.result
  const renderResultDetails = result && (
    <div className="flex items-center">
      <p className="mb-2 mr-auto text-sm text-gray-500">
        {result.searchResults}
      </p>
      <TotalResult label="Total Links" value={result.totalLinks} />
      <TotalResult label="Total AdWords" value={result.totalAdWords} />
    </div>
  )

  const logout = () => {
    sessionStorage.clear()
    clearUserData()
    router.replace('/sign-in')
  }

  return (
    <ProtectedPage>
      <main className="m-auto flex min-h-screen max-w-7xl flex-col space-y-6 bg-white p-6">
        <Button
          onClick={logout}
          variant="secondary"
          className="ml-auto mt-0 flex"
        >
          <LogoutIcon />
        </Button>
        <FileUpload setKeywords={setKeywords} />
        {keywords.length === 0 ? (
          <NoKeywordsMessage />
        ) : (
          <div>
            {renderResultDetails}
            <KeywordsList
              keywords={keywords}
              fetchKeywordDetail={fetchKeywordDetail}
            />
          </div>
        )}
        {!result ? (
          <ProcessingResultsMessage />
        ) : (
          <HTMLRender htmlCode={result.htmlCode} />
        )}
      </main>
    </ProtectedPage>
  )
}

function LogoutIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.593 10.943c.584.585.584 1.53 0 2.116L18.71 15.95c-.39.39-1.03.39-1.42 0a.996.996 0 0 1 0-1.41 9.552 9.552 0 0 1 1.689-1.345l.387-.242-.207-.206a10 10 0 0 1-2.24.254H8.998a1 1 0 1 1 0-2h7.921a10 10 0 0 1 2.24.254l.207-.206-.386-.241a9.562 9.562 0 0 1-1.69-1.348.996.996 0 0 1 0-1.41c.39-.39 1.03-.39 1.42 0l2.883 2.893zM14 16a1 1 0 0 0-1 1v1.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1.505a1 1 0 1 0 2 0V5.5A2.5 2.5 0 0 0 12.5 3h-7A2.5 2.5 0 0 0 3 5.5v13A2.5 2.5 0 0 0 5.5 21h7a2.5 2.5 0 0 0 2.5-2.5V17a1 1 0 0 0-1-1z"
        fill="#06b6d4"
      />
    </svg>
  )
}

import FileUpload from '@/components/FileUpload'
import KeywordsList from '@/components/keywords/KeywordsList'
import NoKeywordsMessage from '@/components/keywords/NoKeywordsMessage'
import HTMLRender from '@/components/searchResults/HTMLRender'
import ProcessingResultsMessage from '@/components/searchResults/ProcessingResultsMessage'

export default function Home() {
  //useKeywords
  //getSearchResultsbyKeywordId
  const keywords: string[] = [
    'React',
    'Next.js',
    'Tailwind CSS',
    'JavaScript',
    'Web Development how to implement a web application',
    'Frontend',
    'Backend',
    'Node.js',
    'Express.js',
    'MongoDB',
    'GraphQL',
    'REST API',
    'Responsive Design',
    'UI/UX Design',
    'Single Page Application',
    'State Management',
    'Component Library',
    'Code Splitting',
    'Server-side Rendering',
    'Progressive Web App',
    'React',
    'Next.js',
    'Tailwind CSS',
    'JavaScript',
    'Web Development',
    'Frontend',
    'Backend',
    'Node.js',
    'Express.js',
    'MongoDB',
    'GraphQL',
    'REST API',
    'Responsive Design',
    'UI/UX Design',
    'Single Page Application',
    'State Management',
    'Component Library',
    'Code Splitting',
    'how to learn a new thing within one day',
    'Server-side Rendering',
    'Progressive Web App',
    'how to implement a new button with custom values',
    'Responsive Design',
    'UI/UX Design',
    'Single Page Application',
    'State Management',
    'Component Library',
    'Code Splitting',
    'how to learn a new thing within one day',
    'Server-side Rendering',
    'Progressive Web App',
    'how to implement a new button with custom values',
  ]
  const isProcessed = true

  return (
    <main className="m-auto flex min-h-screen max-w-7xl flex-col space-y-6 bg-white p-6">
      <FileUpload />
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

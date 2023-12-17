import FileUpload from '@/components/FileUpload'
import KeywordsList from '@/components/keywords/KeywordsList'
import NoKeywordsMessage from '@/components/keywords/NoKeywordsMessage'
import HTMLRender from '@/components/searchResults/HTMLRender'
import ProcessingResultsMessage from '@/components/searchResults/ProcessingResultsMessage'

export default function Home() {
  const keywords: string[] = [
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
    'Server-side Rendering',
    'Progressive Web App',
  ]
  const isProcessed = false

  return (
    <main className="m-auto flex min-h-screen max-w-7xl flex-col space-y-6 bg-white p-6">
      <FileUpload />
      {keywords.length === 0 ? (
        <NoKeywordsMessage />
      ) : (
        <KeywordsList keywords={keywords} />
      )}
      {!isProcessed ? <ProcessingResultsMessage /> : <HTMLRender />}
    </main>
  )
}

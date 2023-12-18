import { searchResults } from '@/interfaces/searchResult'

const htmlString = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Search Results</title>
      <!-- Add any additional head elements or stylesheets here -->
    </head>
    <body>
      <div>
        ${searchResults
          .map(
            (result, index) => `
          <div key=${index} className="mb-4">
            <h2 className="font-bold text-blue-500">${result.title}</h2>
            <p className="text-gray-700">${result.snippet}</p>
            <a
              href=${result.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              ${result.link}
            </a>
          </div>
        `,
          )
          .join('')}
      </div>
    </body>
    </html>
  `
export default function HTMLRender() {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} className='border border-gray-200 rounded-md p-6'></div>
}

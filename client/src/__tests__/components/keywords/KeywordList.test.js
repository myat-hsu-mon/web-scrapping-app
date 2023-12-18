import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import KeywordsList from '../../../components/keywords/KeywordsList'

describe('KeywordsList Component', () => {
  const mockFetchKeywordDetail = jest.fn()

  const keywords = [
    { id: 1, name: 'React' },
    { id: 2, name: 'Next.js' },
  ]

  it('renders KeywordsList correctly', () => {
    render(
      <KeywordsList
        keywords={keywords}
        fetchKeywordDetail={mockFetchKeywordDetail}
      />,
    )

    const keywordsListElement = screen.getByTestId('keywords-list')
    expect(keywordsListElement).toBeInTheDocument()

    keywords.forEach((keyword) => {
      const keywordBadgeElement = screen.getByText(keyword.name)
      expect(keywordBadgeElement).toBeInTheDocument()
    })
  })

  it('calls handleActiveBadge and fetchKeywordDetail when a badge is clicked', () => {
    render(
      <KeywordsList
        keywords={keywords}
        fetchKeywordDetail={mockFetchKeywordDetail}
      />,
    )

    keywords.forEach((keyword, index) => {
      const keywordBadgeElement = screen.getByText(keyword.name)
      fireEvent.click(keywordBadgeElement)

      expect(mockFetchKeywordDetail).toHaveBeenCalledWith(keyword.id)
      expect(keywordBadgeElement).toHaveClass('bg-cyan-800')
    })
  })
})

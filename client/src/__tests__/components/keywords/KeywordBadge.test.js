import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import KeywordBadge from '../../../components/keywords/KeywordBadge'

describe('KeywordBadge Component', () => {
  it('renders KeywordBadge correctly', () => {
    const keyword = 'React'
    const handleActiveBadge = jest.fn()

    render(
      <KeywordBadge
        keyword={keyword}
        isActive={false}
        handleActiveBadge={handleActiveBadge}
      />,
    )

    const keywordBadgeElement = screen.getByText(keyword)
    expect(keywordBadgeElement).toBeInTheDocument()
    expect(keywordBadgeElement).toHaveClass('bg-cyan-500')
  })

  it('renders active KeywordBadge correctly', () => {
    const keyword = 'React'
    const handleActiveBadge = jest.fn()

    render(
      <KeywordBadge
        keyword={keyword}
        isActive={true}
        handleActiveBadge={handleActiveBadge}
      />,
    )

    const keywordBadgeElement = screen.getByText(keyword)
    expect(keywordBadgeElement).toBeInTheDocument()
    expect(keywordBadgeElement).toHaveClass('bg-cyan-800')
  })

  it('calls handleActiveBadge onClick', () => {
    const keyword = 'React'
    const handleActiveBadge = jest.fn()

    render(
      <KeywordBadge
        keyword={keyword}
        isActive={false}
        handleActiveBadge={handleActiveBadge}
      />,
    )

    const keywordBadgeElement = screen.getByText(keyword)
    fireEvent.click(keywordBadgeElement)

    expect(handleActiveBadge).toHaveBeenCalled()
  })
})

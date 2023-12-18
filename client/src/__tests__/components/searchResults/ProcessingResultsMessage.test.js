import { render, screen } from '@testing-library/react'
import "@testing-library/jest-dom"


import ProcessingResultsMessage from "../../../components/searchResults/ProcessingResultsMessage"

describe('ProcessingResultsMessage Component', () => {
  it('renders ProcessingResultsMessage correctly', () => {
    render(<ProcessingResultsMessage />)

    const messageContainer = screen.getByText('Processing Search Results')
    const loadingSpinner = screen.getByTestId('loading-spinner')

    expect(messageContainer).toBeInTheDocument()
    expect(messageContainer).toHaveClass('mb-4 text-xl font-bold uppercase')
    expect(loadingSpinner).toBeInTheDocument()
  })
})

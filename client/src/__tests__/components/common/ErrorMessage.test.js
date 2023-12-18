import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import ErrorMessage from '../../../components/common/ErrorMessage'

describe('ErrorMessage Component', () => {
  it('renders error message correctly', () => {
    const errorMessage = 'This is an error message'

    render(<ErrorMessage message={errorMessage} />)

    const errorElement = screen.getByText(errorMessage)
    expect(errorElement).toBeInTheDocument()
    expect(errorElement).toHaveClass('mt-2 text-xs text-red-500')
  })

  it('renders nothing when message is not provided', () => {
    render(<ErrorMessage />)

    const errorElement = screen.queryByRole('alert')
    expect(errorElement).toBeNull()
  })
})

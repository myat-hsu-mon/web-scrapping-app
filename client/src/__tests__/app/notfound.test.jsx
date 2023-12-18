import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import NotFound from '../../app/not-found'

describe('NotFound Component', () => {
  it('renders the 404 message and "Go back home" button', () => {
    render(<NotFound />)

    const errorMessage = screen.getByText(/404/i)
    expect(errorMessage).toBeInTheDocument()

    const heading = screen.getByText(/Page not found/i)
    expect(heading).toBeInTheDocument()

    const description = screen.getByText(
      /Sorry, we couldn’t find the page you’re looking for./i,
    )
    expect(description).toBeInTheDocument()
  })
})

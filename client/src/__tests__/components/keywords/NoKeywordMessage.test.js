import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import NoKeywordsMessage from '../../../components/keywords/NoKeywordsMessage'

describe('NoKeywordsMessage Component', () => {
  it('renders NoKeywordsMessage correctly', () => {
    render(<NoKeywordsMessage />)

    const headingElement = screen.getByRole('heading', {
      level: 2,
      name: /no uploaded keywords/i,
    })
    expect(headingElement).toBeInTheDocument()
  })
})

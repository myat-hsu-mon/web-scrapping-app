import { render, screen } from '@testing-library/react'
import { Button } from '../../../components/common/Button'
import '@testing-library/jest-dom'

describe('Button Component', () => {
  it('renders primary button correctly', () => {
    render(<Button variant="primary">Click me</Button>)

    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toHaveAttribute('class')
  })
})

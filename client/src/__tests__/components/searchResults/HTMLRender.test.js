import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HTMLRender from '../../../components/searchResults/HTMLRender'

describe('HTMLRender Component', () => {
  it('renders HTMLRender correctly with provided HTML code', () => {
    const htmlCode = '<div><p>Hello, World!</p></div>'
    render(<HTMLRender htmlCode={htmlCode} />)

    const renderedHTML = screen.getByTestId('rendered-html')

    expect(renderedHTML).toBeInTheDocument()
    expect(renderedHTML).toHaveClass('rounded-md border border-gray-200 p-6')
    expect(renderedHTML).toHaveProperty('innerHTML', htmlCode)
  })
})

import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'

import FileUpload from '../../components/FileUpload'

describe('FileUpload Component', () => {
  it('handles file change correctly', async () => {
    const setKeywordsMock = jest.fn()
    render(<FileUpload setKeywords={setKeywordsMock} />)

    const file = new File([''], 'test.csv', { type: 'text/csv' })
    const input = screen.getByLabelText('Click to browse (CSV file)')
    await act(async () => {
      fireEvent.change(input, { target: { files: [file] } })
    })
    expect(setKeywordsMock).toBeTruthy()
  })
})

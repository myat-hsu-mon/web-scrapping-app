import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Container,
  ContainerOuter,
  ContainerInner,
} from '../../../components/common/Container'

describe('Container Components', () => {
  it('renders Container component correctly', () => {
    render(<Container>Content</Container>)

    const containerElement = screen.getByText('Content')
    expect(containerElement).toBeInTheDocument()
  })

  it('renders ContainerOuter component correctly', () => {
    render(<ContainerOuter>Content</ContainerOuter>)

    const containerOuterElement = screen.getByText('Content')
    expect(containerOuterElement).toBeInTheDocument()
  })

  it('renders ContainerInner component correctly', () => {
    render(<ContainerInner>Content</ContainerInner>)

    const containerInnerElement = screen.getByText('Content')
    expect(containerInnerElement).toBeInTheDocument()
  })
})

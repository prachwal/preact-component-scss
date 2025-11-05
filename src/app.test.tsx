import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/preact'
import { App } from './app.tsx'
import { ThemeProvider } from './theme-provider.tsx'

describe('App', () => {
  it('should render the app with initial state', () => {
    render(<ThemeProvider><App /></ThemeProvider>)

    expect(screen.getByText('Vite + Preact')).toBeTruthy()
    expect(screen.getByText('count is 0')).toBeTruthy()
  })

  it('should increment count when button is clicked', async () => {
    render(<ThemeProvider><App /></ThemeProvider>)

    const button = screen.getByText('count is 0')
    expect(button).toBeTruthy()

    fireEvent.click(button)
    expect(screen.getByText('count is 1')).toBeTruthy()

    fireEvent.click(button)
    expect(screen.getByText('count is 2')).toBeTruthy()
  })

  it('should render logos with correct attributes', () => {
    render(<ThemeProvider><App /></ThemeProvider>)

    const viteLogo = screen.getByAltText('Vite logo')
    const preactLogo = screen.getByAltText('Preact logo')

    expect(viteLogo).toBeTruthy()
    expect(preactLogo).toBeTruthy()
    expect(viteLogo.className).toContain('logo')
    expect(preactLogo.className).toContain('logo')
    expect(preactLogo.className).toContain('preact')
  })
})
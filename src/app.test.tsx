import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/preact'
import { App } from './app.tsx'
import { ThemeProvider } from './theme-provider.tsx'

describe('App', () => {
  it('should render the app with initial state', () => {
    render(<ThemeProvider><App /></ThemeProvider>)

    expect(screen.getByText('Vite + Preact')).toBeTruthy()
    expect(screen.getByText('Responsive Grid Demo')).toBeTruthy()
    expect(screen.getByText('Flex Tiles Demo')).toBeTruthy()
  })

  it('should render demo components correctly', () => {
    render(<ThemeProvider><App /></ThemeProvider>)

    // Check grid demo
    expect(screen.getByText('6 columns on desktop, 3 on tablet, 1 on mobile')).toBeTruthy()
    expect(screen.getByText('Card 1')).toBeTruthy()
    expect(screen.getByText('First card content')).toBeTruthy()

    // Check flex tiles demo
    expect(screen.getByText('Flexible tile layout that adapts to available space')).toBeTruthy()
    expect(screen.getByText('Welcome')).toBeTruthy()
    expect(screen.getByText('Components')).toBeTruthy()
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
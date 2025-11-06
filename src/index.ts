// Main library entry point
import './styles/main.scss'

// ===== Core App =====
export { App } from './app'

// ===== Utilities =====
export { formatCount, isEven } from './utils'

// ===== Components =====
export * from './components'

// ===== Theme Provider =====
export { ThemeProvider, useTheme } from './theme-provider'
export type { Theme } from './theme-provider'

// ===== Version =====
export const VERSION = '1.0.0'

// ===== Type Guards =====
export const isValidTheme = (theme: unknown): theme is 'dark' | 'light' | 'auto' => {
  return typeof theme === 'string' && ['dark', 'light', 'auto'].includes(theme)
}
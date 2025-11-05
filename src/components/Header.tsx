import viteLogo from '/vite.svg'
import { useTheme } from '../theme-provider'

export function Header() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme.value === 'dark') {
      setTheme('light')
    } else if (theme.value === 'light') {
      setTheme('auto')
    } else {
      setTheme('dark')
    }
  }

  const getThemeIcon = () => {
    switch (theme.value) {
      case 'dark': return '🌙'
      case 'light': return '☀️'
      case 'auto': return '🌓'
      default: return '🌓'
    }
  }

  return (
    <header>
      <div class="header-content">
        <div class="logos">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} class="logo" alt="Vite logo" />
          </a>
          <a href="https://preactjs.com" target="_blank">
            <img src="/src/assets/preact.svg" class="logo preact" alt="Preact logo" />
          </a>
        </div>
        <h1>Vite + Preact</h1>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          title={`Current theme: ${theme.value}`}
        >
          {getThemeIcon()}
        </button>
      </div>
    </header>
  )
}
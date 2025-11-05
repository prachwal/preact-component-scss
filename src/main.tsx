import { render } from 'preact'
import './styles/main.scss'
import { App } from './app.tsx'
import { ThemeProvider } from './theme-provider.tsx'

render(
    <ThemeProvider>
        <App />
    </ThemeProvider>
, document.getElementById('app')!)

// Remove loading flash by showing content after hydration
document.documentElement.classList.remove('no-js')

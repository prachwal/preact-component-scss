import { useSignal } from '@preact/signals'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import { useTheme } from './theme-provider'

export function App() {
  const count = useSignal(0)
  const { theme, setTheme } = useTheme()

  return (
    <>
      <header>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img src={preactLogo} class="logo preact" alt="Preact logo" />
        </a>
        <h1>Vite + Preact</h1>
        <div>
          <button onClick={() => setTheme('dark')}>Dark</button>
          <button onClick={() => setTheme('light')}>Light</button>
          <button onClick={() => setTheme('auto')}>Auto</button>
          <p>Current theme: {theme.value}</p>
        </div>
      </header>
      <main>
        <section class="card">
          <button onClick={() => count.value++}>
            count is {count}
          </button>
          <p>
            Edit <code>src/app.tsx</code> and save to test HMR
          </p>
        </section>
        <p>
          Check out{' '}
          <a
            href="https://preactjs.com/guide/v10/getting-started#create-a-vite-powered-preact-app"
            target="_blank"
          >
            create-preact
          </a>
          , the official Preact + Vite starter
        </p>
        <p class="read-the-docs">
          Click on the Vite and Preact logos to learn more
        </p>
      </main>
    </>
  )
}

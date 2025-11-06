import { useSignal } from '@preact/signals'
import { Button } from '../Button'

export function Main() {
  const count = useSignal(0)

  return (
    <main>
      <section class="card">
        <Button 
          size='medium'
          onClick={() => count.value++}>
          count is {count}
        </Button>
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
  )
}
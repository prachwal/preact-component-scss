import { GridDemo, FlexTilesDemo } from '../index';

export function Main() {
  return (
    <main>
      <GridDemo />
      <FlexTilesDemo />

      <section class="demo-section">
        <h2>Component Library Info</h2>
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
      </section>
    </main>
  )
}
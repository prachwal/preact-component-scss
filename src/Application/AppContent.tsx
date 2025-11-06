import { GridDemo, FlexTilesDemo } from '.';
import { Card, Button } from '../components';

export function AppContent() {
  return (
    <>
      <GridDemo />
      <FlexTilesDemo />

      <section class='demo-section'>
        <h2>Card Padding Options</h2>
        <p>
          Demonstrating the optional <code>noPadding</code> prop
        </p>
        <div class='demo-grid demo-grid--2col'>
          <Card title='Default Card (with padding)'>
            <p>This card has the default padding applied to header and content.</p>
            <Button size='small' variant='primary'>
              Default Action
            </Button>
          </Card>

          <Card title='No Padding Card' noPadding>
            <div style='padding: var(--spacing-base);'>
              <p>This card has no default padding. The developer controls all spacing.</p>
              <Button size='small' variant='secondary'>
                Custom Action
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <section class='demo-section'>
        <h2>Component Library Info</h2>
        <p>
          Check out{' '}
          <a
            href='https://preactjs.com/guide/v10/getting-started#create-a-vite-powered-preact-app'
            target='_blank'
          >
            create-preact
          </a>
          , the official Preact + Vite starter
        </p>
        <p class='read-the-docs'>Click on the Vite and Preact logos to learn more</p>
      </section>
    </>
  );
}

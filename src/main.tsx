import { render } from 'preact';
import './styles/main.scss';
import { ThemeProvider } from './theme-provider.tsx';
import { App } from './App.tsx';

const appElement = document.getElementById('app');
if (!appElement) {
  throw new Error('App element not found');
}

render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  appElement
);

// Remove loading flash by showing content after hydration
document.documentElement.classList.remove('no-js');

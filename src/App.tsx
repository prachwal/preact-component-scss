import { AppContent } from './Application/AppContent';
import { Header, Main, Footer } from './components';

export function App() {
  return (
    <>
      <Header>
        <h1>Vite + Preact</h1>
      </Header>
      <Main>
        <AppContent />
      </Main>
      <Footer>
        <p>&copy; 2025 Preact Component Library v{__APP_VERSION__}. Built with Preact and SCSS.</p>
      </Footer>
    </>
  );
}

// Main library entry point
import './styles/main.scss';

// ===== Components =====
export * from './components';

// ===== Theme Provider =====
export { ThemeProvider, useTheme } from './theme-provider';
export type { Theme } from './theme-provider';

// ===== Version =====
import pkg from '../package.json';
export const VERSION = pkg.version;

// ===== Type Guards =====
export const isValidTheme = (theme: unknown): theme is 'dark' | 'light' | 'auto' => {
  return typeof theme === 'string' && ['dark', 'light', 'auto'].includes(theme);
};

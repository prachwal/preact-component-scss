import { memo } from 'preact/compat';
import { useCallback, useMemo } from 'preact/hooks';
import viteLogo from '/vite.svg';
import { useTheme } from '../../theme-provider';
import { Button } from '../Button';
import type { ComponentType, ComponentChildren } from 'preact';
import { ICONS } from '../../constants/icons';

// Typy dla ikon motywów
const THEME_ICONS = {
  dark: ICONS.moon,
  light: ICONS.sun,
  auto: ICONS.auto,
} as const;

const THEME_LABELS = {
  dark: 'Dark mode',
  light: 'Light mode',
  auto: 'Auto (system) mode',
} as const;

export interface HeaderProps {
  children?: ComponentChildren;
}

/**
 * Header component with theme switcher
 * Accepts children for custom header content
 * Memoized for performance optimization
 */
type HeaderComponent = ComponentType<HeaderProps> & {
  displayName?: string;
};

export const Header: HeaderComponent = memo(({ children }) => {
  const { theme, setTheme } = useTheme();

  // Memoizowana funkcja toggle
  const toggleTheme = useCallback(() => {
    const themeValue = theme.value;

    switch (themeValue) {
      case 'dark':
        setTheme('light');
        break;
      case 'light':
        setTheme('auto');
        break;
      case 'auto':
      default:
        setTheme('dark');
        break;
    }
  }, [theme.value, setTheme]);

  // Memoizowana ikona
  const themeIcon = useMemo(() => THEME_ICONS[theme.value] || THEME_ICONS.auto, [theme.value]);

  // Memoizowana etykieta
  const themeLabel = useMemo(() => THEME_LABELS[theme.value] || THEME_LABELS.auto, [theme.value]);

  // Obsługa skrótów klawiszowych
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 't' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleTheme();
      }
    },
    [toggleTheme]
  );

  return (
    <header role='banner'>
      <div className='header-content'>
        <div className='logos' role='group' aria-label='Technology logos'>
          <a
            href='https://vite.dev'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Visit Vite website'
          >
            <img src={viteLogo} className='logo' alt='Vite logo' width='32' height='32' />
          </a>
          <a
            href='https://preactjs.com'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Visit Preact website'
          >
            <img
              src='/src/assets/preact.svg'
              className='logo preact'
              alt='Preact logo'
              width='32'
              height='32'
            />
          </a>
        </div>

        {children || <h1>Vite + Preact</h1>}

        <Button
          variant='ghost'
          size='small'
          className='theme-toggle'
          onClick={toggleTheme}
          onKeyDown={handleKeyDown}
          title={`${themeLabel} (Ctrl+T to toggle)`}
          aria-label={`Switch theme. Current: ${themeLabel}`}
          role='switch'
          aria-checked={
            theme.value === 'auto' ? 'mixed' : theme.value === 'light' ? 'true' : 'false'
          }
          icon={themeIcon}
        />
      </div>
    </header>
  );
});

Header.displayName = 'Header';

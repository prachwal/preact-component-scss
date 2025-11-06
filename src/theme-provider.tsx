import { createContext, type ComponentChildren } from 'preact';
import { useContext, useEffect, useCallback } from 'preact/hooks';
import { useSignal, Signal } from '@preact/signals';

import './styles/main.scss';

// Typy
export type Theme = 'dark' | 'light' | 'auto';

interface ThemeContextValue {
  theme: Signal<Theme>;
  setTheme: (theme: Theme) => void;
  resolvedTheme: Signal<'dark' | 'light'>;
}

interface ThemeProviderProps {
  children: ComponentChildren;
  defaultTheme?: Theme;
  storageKey?: string;
}

// Bezpieczny dostęp do localStorage
class StorageManager {
  private key: string;
  
  constructor(key: string = 'theme') {
    this.key = key;
  }
  
  get(): Theme | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const value = localStorage.getItem(this.key);
      if (value === 'dark' || value === 'light' || value === 'auto') {
        return value;
      }
      return null;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return null;
    }
  }
  
  set(value: Theme): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.key, value);
    } catch (error) {
      console.warn('Failed to write to localStorage:', error);
    }
  }
}

// Context z prawidłowymi typami
const ThemeContext = createContext<ThemeContextValue | null>(null);

// Custom hook z walidacją
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

// Funkcja do wykrywania preferencji systemowych
const getSystemTheme = (): 'dark' | 'light' => {
  if (typeof window === 'undefined') return 'light';
  
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  } catch {
    return 'light';
  }
};

// Funkcja do aplikowania motywu
const applyTheme = (theme: Theme, resolvedTheme: Signal<'dark' | 'light'>): void => {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  root.classList.remove('theme-light', 'theme-dark');
  
  let finalTheme: 'dark' | 'light';
  
  if (theme === 'auto') {
    finalTheme = getSystemTheme();
  } else {
    finalTheme = theme;
  }
  
  root.classList.add(`theme-${finalTheme}`);
  resolvedTheme.value = finalTheme;
};

// Provider z pełną obsługą błędów i SSR
export function ThemeProvider({ 
  children, 
  defaultTheme = 'auto',
  storageKey = 'theme'
}: ThemeProviderProps) {
  const theme = useSignal<Theme>(defaultTheme);
  const resolvedTheme = useSignal<'dark' | 'light'>('light');
  const storage = new StorageManager(storageKey);
  
  const setTheme = useCallback((newTheme: Theme) => {
    theme.value = newTheme;
    storage.set(newTheme);
    applyTheme(newTheme, resolvedTheme);
  }, []);
  
  // Inicjalizacja motywu
  useEffect(() => {
    const savedTheme = storage.get();
    const initialTheme = savedTheme || defaultTheme;
    
    theme.value = initialTheme;
    applyTheme(initialTheme, resolvedTheme);
    
    // Nasłuchiwanie na zmiany systemowych preferencji
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = () => {
        if (theme.value === 'auto') {
          applyTheme('auto', resolvedTheme);
        }
      };
      
      // Nowoczesny sposób
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
      // Fallback dla starszych przeglądarek
      else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, []);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
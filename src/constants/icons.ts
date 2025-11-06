/**
 * Centralized icon constants for the application
 * Using emoji for simplicity and cross-platform compatibility
 */
export const ICONS = {
  home: '🏠',
  puzzle: '🧩',
  grid: '⊞',
  tiles: '⊟',
  sun: '☀️',
  moon: '🌙',
  auto: '⚖️',
  logo: '⚡',
  phone: '📱',
  pencil: '📝',
  bolt: '⚡',
} as const;

export type IconName = keyof typeof ICONS;

// Components index - central export point for all components

// ===== Shared Types =====
export type { BaseProps } from './types';
export { exhaustiveCheck } from './types';

// ===== Layout Components =====
export { Header } from './Header';
export { Main } from './Main';
export { Footer } from './Footer';

// ===== UI Components =====
export { Button, isValidButtonSize, isValidButtonVariant } from './Button';
export type { ButtonProps, ButtonSize, ButtonVariant, ButtonType } from './Button';

// ===== Card Components =====
export { Card } from './Card';
export type { CardProps, CardSize, CardVariant, CardTag } from './Card';

import type { JSX, ComponentChildren } from 'preact';

/**
 * Base props interface for all components
 * Provides common HTML attributes and Preact-specific props
 */
export interface BaseProps extends Omit<JSX.HTMLAttributes<HTMLElement>, 'size' | 'ref'> {
  className?: string;
  children?: ComponentChildren;
  disabled?: boolean;
}

/**
 * Base props for button-like components
 */
export interface BaseButtonProps
  extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'size' | 'ref'> {
  className?: string;
  children?: ComponentChildren;
  disabled?: boolean;
}

/**
 * Type guard for exhaustive enum checking
 * Throws error if value is not in allowed array
 */
export const exhaustiveCheck = <T extends string>(value: T, allowed: readonly T[]): void => {
  if (!allowed.includes(value as T)) {
    throw new Error(`Invalid value: ${value}. Allowed values: ${allowed.join(', ')}`);
  }
};

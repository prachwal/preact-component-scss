import type { ComponentChildren, JSX } from 'preact';
import { forwardRef } from 'preact/compat';

// Eksportowane typy
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonType = 'button' | 'submit' | 'reset';

// Pełny interfejs z prawidłowymi typami
export interface ButtonProps extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'size' | 'loading' | 'icon'> {
  /** Button size variant @default 'medium' */
  size?: ButtonSize;
  
  /** Button style variant @default 'primary' */
  variant?: ButtonVariant;
  
  /** Loading state - shows spinner and disables button @default false */
  loading?: boolean;
  
  /** Icon to display before text */
  icon?: ComponentChildren;
  
  /** Icon to display after text */
  iconEnd?: ComponentChildren;
  
  /** Full width button @default false */
  fullWidth?: boolean;
  
  /** Children content */
  children?: ComponentChildren;
  
  /** Button type attribute @default 'button' */
  type?: ButtonType;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Click handler with proper typing */
  onClick?: (event: MouseEvent) => void;
  
  /** CSS class name */
  className?: string;
  
  /** Accessible label for screen readers */
  'aria-label'?: string;
  
  /** Accessible description */
  'aria-describedby'?: string;
}

/**
 * Universal Button component with multiple variants and sizes.
 * 
 * @example
 * ```tsx
 * // Primary button
 * <Button variant="primary" onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * 
 * // Loading button
 * <Button loading>Processing...</Button>
 * 
 * // Button with icon
 * <Button icon={<IconCheck />}>Save</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    size = 'medium',
    variant = 'primary',
    loading = false,
    icon,
    iconEnd,
    fullWidth = false,
    type = 'button',
    disabled = false,
    onClick,
    className = '',
    children,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    ...restProps
  } = props;

  // Build CSS classes with proper typing
  const classes = [
    'button',
    `button--${size}`,
    `button--${variant}`,
    fullWidth && 'button--full-width',
    loading && 'button--loading',
    disabled && 'button--disabled',
    className
  ].filter(Boolean).join(' ');

  // Obsługa kliknięcia z walidacją
  const handleClick = (event: MouseEvent) => {
    if (disabled || loading) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  // Automatyczne aria-label dla buttonów z tylko ikoną
  const computedAriaLabel = ariaLabel || (icon && !children ? 'Button' : undefined);

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-label={computedAriaLabel}
      aria-describedby={ariaDescribedby}
      aria-busy={loading}
      {...restProps}
    >
      {loading && (
        <span className="button__spinner" role="status" aria-label="Loading">
          <span className="sr-only">Loading...</span>
        </span>
      )}
      {icon && !loading && (
        <span className="button__icon button__icon--start" aria-hidden="true">
          {icon}
        </span>
      )}
      {children && <span className="button__content">{children}</span>}
      {iconEnd && !loading && (
        <span className="button__icon button__icon--end" aria-hidden="true">
          {iconEnd}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

// Utility type guard
export const isValidButtonSize = (size: unknown): size is ButtonSize => {
  return typeof size === 'string' && ['small', 'medium', 'large'].includes(size);
};

export const isValidButtonVariant = (variant: unknown): variant is ButtonVariant => {
  return typeof variant === 'string' && ['primary', 'secondary', 'ghost', 'danger'].includes(variant);
};
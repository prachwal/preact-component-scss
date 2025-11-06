import type { ComponentChildren, JSX } from 'preact';
import { forwardRef } from 'preact/compat';

// Exported types
export type CardSize = 'small' | 'medium' | 'large';
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';
export type CardTag = 'section' | 'article' | 'main' | 'div' | 'aside';

// Full interface with proper types
export interface CardProps extends Omit<JSX.HTMLAttributes<HTMLElement>, 'size' | 'icon'> {
  /** Card size variant affecting padding and header size @default 'medium' */
  size?: CardSize;

  /** Card style variant @default 'default' */
  variant?: CardVariant;

  /** HTML tag to use for the card container @default 'section' */
  as?: CardTag;

  /** Card title/header text */
  title?: string;

  /** Header size variant (overrides card size for header) */
  headerSize?: CardSize;

  /** Icon to display in header */
  icon?: ComponentChildren;

  /** Custom header content (overrides title and icon) */
  header?: ComponentChildren;

  /** Children content */
  children?: ComponentChildren;
}

export const Card = forwardRef<HTMLElement, CardProps>((props, ref) => {
  const {
    size = 'medium',
    variant = 'default',
    as: Tag = 'section',
    title,
    headerSize,
    icon,
    header,
    class: className,
    children,
    ...restProps
  } = props;

  const cardClasses = [
    'card',
    `card--${size}`,
    `card--${variant}`,
    className
  ].filter(Boolean).join(' ');

  const headerClasses = [
    'card__header',
    headerSize && `card__header--${headerSize}`
  ].filter(Boolean).join(' ');

  const renderCard = () => {
    const commonProps = {
      ref: ref as any,
      class: cardClasses,
      ...restProps
    };

    const content = (
      <>
        {(header || title || icon) && (
          <header class={headerClasses}>
            {header ? (
              header
            ) : (
              <>
                {icon && <div class="card__icon">{icon}</div>}
                {title && <h3 class="card__title">{title}</h3>}
              </>
            )}
          </header>
        )}
        {children && (
          <div class="card__content">
            {children}
          </div>
        )}
      </>
    );

    switch (Tag) {
      case 'article':
        return <article {...commonProps}>{content}</article>;
      case 'main':
        return <main {...commonProps}>{content}</main>;
      case 'aside':
        return <aside {...commonProps}>{content}</aside>;
      case 'div':
        return <div {...commonProps}>{content}</div>;
      case 'section':
      default:
        return <section {...commonProps}>{content}</section>;
    }
  };

  return renderCard();
});
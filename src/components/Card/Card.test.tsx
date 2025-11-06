import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { Card } from './Card';

describe('Card', () => {
  it('renders with default props', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeTruthy();
  });

  it('renders with title', () => {
    render(<Card title="Test Title">Card content</Card>);
    expect(screen.getByText('Test Title')).toBeTruthy();
    expect(screen.getByText('Card content')).toBeTruthy();
  });

  it('renders with custom tag', () => {
    const { container } = render(<Card as="article">Article content</Card>);
    expect(container.firstElementChild?.tagName).toBe('ARTICLE');
  });

  it('renders with different sizes', () => {
    const { container } = render(<Card size="large">Large card</Card>);
    expect((container.firstChild as HTMLElement)?.className).toContain('card--large');
  });

  it('renders with different variants', () => {
    const { container } = render(<Card variant="elevated">Elevated card</Card>);
    expect((container.firstChild as HTMLElement)?.className).toContain('card--elevated');
  });
});
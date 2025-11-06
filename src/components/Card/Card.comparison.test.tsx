import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/preact';
import { Button } from '../Button';
import { Card } from '../Card';

describe('Card vs section.card comparison', () => {
  const testContent = (
    <>
      <Button size='medium'>Test Button</Button>
      <p>Test paragraph content</p>
    </>
  );

  it('Card component should render equivalent to section.card', () => {
    // Render the new Card component
    const { container: cardContainer } = render(<Card>{testContent}</Card>);

    // Render the old section.card approach
    const { container: sectionContainer } = render(
      <section className='card'>{testContent}</section>
    );

    // Compare the outer HTML structure
    const cardElement = cardContainer.firstElementChild;
    const sectionElement = sectionContainer.firstElementChild;

    // Both should be section elements (Card defaults to section)
    expect(cardElement?.tagName).toBe('SECTION');
    expect(sectionElement?.tagName).toBe('SECTION');

    // Both should have the card class
    expect(cardElement?.className).toContain('card');
    expect(sectionElement?.className).toContain('card');

    // Compare inner HTML structure (should be similar)
    const cardInnerHTML = cardElement?.innerHTML;
    const sectionInnerHTML = sectionElement?.innerHTML;

    // The Card component adds additional structure (card__content div)
    // so we expect them to be different, but both should contain the button and paragraph
    expect(cardInnerHTML).toContain('Test Button');
    expect(cardInnerHTML).toContain('Test paragraph content');
    expect(sectionInnerHTML).toContain('Test Button');
    expect(sectionInnerHTML).toContain('Test paragraph content');
  });

  it('Card with title should have proper header structure', () => {
    const { container } = render(
      <Card title='Test Title'>
        <Button size='medium'>Test Button</Button>
        <p>Test content</p>
      </Card>
    );

    const cardElement = container.firstElementChild;

    // Should have header with title
    const header = cardElement?.querySelector('.card__header');
    expect(header).toBeTruthy();

    const title = header?.querySelector('.card__title');
    expect(title?.textContent).toBe('Test Title');

    // Should have content wrapper
    const content = cardElement?.querySelector('.card__content');
    expect(content).toBeTruthy();
    expect(content?.textContent).toContain('Test Button');
    expect(content?.textContent).toContain('Test content');
  });

  it('Card should support different variants', () => {
    const variants: Array<'default' | 'elevated' | 'outlined' | 'filled'> = [
      'default',
      'elevated',
      'outlined',
      'filled',
    ];

    variants.forEach(variant => {
      const { container } = render(<Card variant={variant}>Content</Card>);
      const cardElement = container.firstElementChild;
      expect(cardElement?.className).toContain(`card--${variant}`);
    });
  });

  it('Card should support different sizes', () => {
    const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];

    sizes.forEach(size => {
      const { container } = render(<Card size={size}>Content</Card>);
      const cardElement = container.firstElementChild;
      expect(cardElement?.className).toContain(`card--${size}`);
    });
  });
});

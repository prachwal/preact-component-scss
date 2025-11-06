import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { Button } from './Button.tsx';
import { ICONS } from '../../constants/icons';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render danger variant', () => {
      render(<Button variant='danger'>Danger</Button>);
      expect(screen.getByRole('button').className).toContain('button--danger');
    });

    it('should render with default props', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });

      expect(button).toBeTruthy();
      expect(button.className).toContain('button');
      expect(button.className).toContain('button--medium');
      expect(button.className).toContain('button--primary');
    });

    it('should render all size variants', () => {
      const { rerender } = render(<Button size='small'>Small</Button>);
      expect(screen.getByRole('button').className).toContain('button--small');

      rerender(<Button size='medium'>Medium</Button>);
      expect(screen.getByRole('button').className).toContain('button--medium');

      rerender(<Button size='large'>Large</Button>);
      expect(screen.getByRole('button').className).toContain('button--large');
    });

    it('should render all variants', () => {
      const variants = ['primary', 'secondary', 'ghost', 'danger'] as const;

      variants.forEach(variant => {
        const { unmount } = render(<Button variant={variant}>{variant}</Button>);
        expect(screen.getByRole('button').className).toContain(`button--${variant}`);
        unmount();
      });
    });

    it('should apply custom className', () => {
      render(<Button className='custom-class'>Button</Button>);
      expect(screen.getByRole('button').className).toContain('custom-class');
    });
  });

  describe('Icons', () => {
    it('should render with start icon', () => {
      render(<Button icon={<span data-testid='icon'>{ICONS.bolt}</span>}>Text</Button>);

      expect(screen.getByTestId('icon')).toBeTruthy();
      expect(screen.getByText('Text')).toBeTruthy();
    });

    it('should render with end icon', () => {
      render(<Button iconEnd={<span data-testid='icon-end'>→</span>}>Text</Button>);

      expect(screen.getByTestId('icon-end')).toBeTruthy();
      expect(screen.getByText('Text')).toBeTruthy();
    });

    it('should render icon without text', () => {
      render(
        <Button icon={<span data-testid='icon'>{ICONS.bolt}</span>} aria-label='Bolt button' />
      );

      expect(screen.getByTestId('icon')).toBeTruthy();
      expect(screen.getByLabelText('Bolt button')).toBeTruthy();
    });
  });

  describe('Loading State', () => {
    it('should show spinner when loading', () => {
      render(<Button loading>Loading</Button>);

      const button = screen.getByRole('button');
      expect(button.className).toContain('button--loading');
      expect(button.getAttribute('aria-busy')).toBe('true');
      expect(screen.getByRole('status')).toBeTruthy();
    });

    it('should hide icons when loading', () => {
      render(
        <Button loading icon={<span data-testid='icon'>{ICONS.bolt}</span>}>
          Loading
        </Button>
      );

      expect(screen.queryByTestId('icon')).toBeFalsy();
      expect(screen.getByRole('status')).toBeTruthy();
    });

    it('should be disabled when loading', () => {
      render(<Button loading>Loading</Button>);

      const button = screen.getByRole('button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });
  });

  describe('Disabled State', () => {
    it('should be disabled', () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole('button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
      expect(button.className).toContain('button--disabled');
    });

    it('should not trigger onClick when disabled', () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Interactions', () => {
    it('should call onClick handler', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when loading', () => {
      const handleClick = vi.fn();
      render(
        <Button loading onClick={handleClick}>
          Loading
        </Button>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should have correct button type', () => {
      const { rerender } = render(<Button type='button'>Button</Button>);
      expect((screen.getByRole('button') as HTMLButtonElement).type).toBe('button');

      rerender(<Button type='submit'>Submit</Button>);
      expect((screen.getByRole('button') as HTMLButtonElement).type).toBe('submit');

      rerender(<Button type='reset'>Reset</Button>);
      expect((screen.getByRole('button') as HTMLButtonElement).type).toBe('reset');
    });
  });

  describe('Layout', () => {
    it('should render full width', () => {
      render(<Button fullWidth>Full Width</Button>);
      expect(screen.getByRole('button').className).toContain('button--full-width');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible name', () => {
      render(<Button aria-label='Custom label'>Button</Button>);
      expect(screen.getByRole('button', { name: /custom label/i })).toBeTruthy();
    });

    it('should have aria-describedby', () => {
      render(<Button aria-describedby='description'>Button</Button>);
      expect(screen.getByRole('button').getAttribute('aria-describedby')).toBe('description');
    });

    it('should have aria-busy when loading', () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole('button').getAttribute('aria-busy')).toBe('true');
    });

    it('should auto-generate aria-label for icon-only buttons', () => {
      render(<Button icon={<span>🔥</span>} />);
      expect(screen.getByRole('button').getAttribute('aria-label')).toBe('Button');
    });
  });

  describe('Forwarded Ref', () => {
    it('should forward ref to button element', () => {
      const ref = { current: null } as React.RefObject<HTMLButtonElement>;
      render(<Button ref={ref}>Button</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect((ref.current as HTMLButtonElement).textContent).toBe('Button');
    });
  });

  describe('Additional Props', () => {
    it('should pass through additional HTML attributes', () => {
      render(
        <Button data-testid='custom-button' title='Tooltip text'>
          Button
        </Button>
      );

      const button = screen.getByTestId('custom-button');
      expect(button.getAttribute('title')).toBe('Tooltip text');
    });
  });
});

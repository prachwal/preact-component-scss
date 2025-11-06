import { describe, it, expect } from 'vitest';
import { exhaustiveCheck } from './types';
import { isValidButtonSize, isValidButtonVariant } from './Button/Button';

describe('exhaustiveCheck', () => {
  it('allows valid values', () => {
    exhaustiveCheck('dark', ['dark', 'light', 'auto'] as const);
    exhaustiveCheck('light', ['dark', 'light', 'auto'] as const);
    exhaustiveCheck('auto', ['dark', 'light', 'auto'] as const);
    expect(true).toBe(true); // No throw
  });

  it('throws on invalid value', () => {
    expect(() => exhaustiveCheck('invalid' as any, ['dark', 'light', 'auto'] as const))
      .toThrow('Invalid value: invalid. Allowed values: dark, light, auto');
  });
});

describe('Button type guards', () => {
  describe('isValidButtonSize', () => {
    it('returns true for valid sizes', () => {
      expect(isValidButtonSize('small')).toBe(true);
      expect(isValidButtonSize('medium')).toBe(true);
      expect(isValidButtonSize('large')).toBe(true);
    });

    it('returns false for invalid sizes', () => {
      expect(isValidButtonSize('invalid')).toBe(false);
      expect(isValidButtonSize(123)).toBe(false);
      expect(isValidButtonSize(null)).toBe(false);
      expect(isValidButtonSize(undefined)).toBe(false);
    });
  });

  describe('isValidButtonVariant', () => {
    it('returns true for valid variants', () => {
      expect(isValidButtonVariant('primary')).toBe(true);
      expect(isValidButtonVariant('secondary')).toBe(true);
      expect(isValidButtonVariant('ghost')).toBe(true);
      expect(isValidButtonVariant('danger')).toBe(true);
    });

    it('returns false for invalid variants', () => {
      expect(isValidButtonVariant('invalid')).toBe(false);
      expect(isValidButtonVariant(123)).toBe(false);
      expect(isValidButtonVariant(null)).toBe(false);
      expect(isValidButtonVariant(undefined)).toBe(false);
    });
  });
});
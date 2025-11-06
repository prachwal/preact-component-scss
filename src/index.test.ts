import { describe, it, expect } from 'vitest';
import { isValidTheme } from './index';

describe('isValidTheme', () => {
  it('returns true for valid themes', () => {
    expect(isValidTheme('dark')).toBe(true);
    expect(isValidTheme('light')).toBe(true);
    expect(isValidTheme('auto')).toBe(true);
  });

  it('returns false for invalid themes', () => {
    expect(isValidTheme('invalid')).toBe(false);
    expect(isValidTheme(123)).toBe(false);
    expect(isValidTheme(null)).toBe(false);
    expect(isValidTheme(undefined)).toBe(false);
  });
});

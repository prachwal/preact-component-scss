import { describe, it, expect } from 'vitest'
import { formatCount, isEven } from './utils.ts'

describe('formatCount', () => {
  it('should format count correctly', () => {
    expect(formatCount(0)).toBe('count is 0')
    expect(formatCount(5)).toBe('count is 5')
    expect(formatCount(-1)).toBe('count is -1')
  })
})

describe('isEven', () => {
  it('should return true for even numbers', () => {
    expect(isEven(0)).toBe(true)
    expect(isEven(2)).toBe(true)
    expect(isEven(100)).toBe(true)
  })

  it('should return false for odd numbers', () => {
    expect(isEven(1)).toBe(false)
    expect(isEven(3)).toBe(false)
    expect(isEven(99)).toBe(false)
  })
})
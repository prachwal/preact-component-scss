// Utility functions for the component library

/**
 * Formats a count number into a display string.
 * @param count - The number to format
 * @returns A formatted string like "count is 5"
 */
export const formatCount = (count: number): string => {
  return `count is ${count}`
}

/**
 * Checks if a number is even.
 * @param num - The number to check
 * @returns True if the number is even, false otherwise
 */
export const isEven = (num: number): boolean => {
  return num % 2 === 0
}
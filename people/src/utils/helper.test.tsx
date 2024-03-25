import { accountTypeDescription, formatDate, getInitials } from './helper';
import '@testing-library/jest-dom';

describe('getInitials function', () => {
  it('returns initials for a single word', () => {
    const result = getInitials('John');
    expect(result).toBe('J');
  });

  it('returns initials for multiple words', () => {
    const result = getInitials('John Doe');
    expect(result).toBe('JD');
  });

  it('returns empty string for an empty input', () => {
    const result = getInitials('');
    expect(result).toBe('');
  });

  it('returns empty string for an input with only spaces', () => {
    const result = getInitials('    ');
    expect(result).toBe('');
  });

  it('returns initials for a name with leading and trailing spaces', () => {
    const result = getInitials('   John   Doe   ');
    expect(result).toBe('JD');
  });

  // Add more test cases as needed to cover different scenarios
});

describe('formatDate function', () => {
  it('formats a valid date', () => {
    // Replace '2023-01-15' with a sample valid date string
    const result = formatDate('2023-01-15');
    expect(result).toBe('Jan 15, 2023');
  });

  it('handles an empty string input', () => {
    const result = formatDate('');
    expect(result).toBe('---');
  });
  // Add more test cases as needed
});
describe('accountTypeDescription function', () => {
  it('should return "Manager" for value 7', () => {
    expect(accountTypeDescription(7)).toBe('Manager');
  });

  it('should return "Admin" for value 2', () => {
    expect(accountTypeDescription(2)).toBe('Admin');
  });

  it('should return "Account Owner" for value 1', () => {
    expect(accountTypeDescription(1)).toBe('Account Owner');
  });

  it('should return "---" for unknown value', () => {
    expect(accountTypeDescription(999)).toBe('---');
  });
});

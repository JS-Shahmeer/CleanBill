/**
 * Domain-layer unit tests (money, status, validation — no React Native
 * dependencies) run under plain ts-jest. Widget/component tests, added once
 * the UI module has real screens to test, get a separate jest-expo config
 * so each stays fast and simple.
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/domain/**/*.test.ts'],
  moduleNameMapper: {
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@data/(.*)$': '<rootDir>/src/data/$1',
  },
};

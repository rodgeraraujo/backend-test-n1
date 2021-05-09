/* eslint-disable no-undef */

module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/', '/migrations/'],
  globalSetup: './tests/config/setup.ts',
  globalTeardown: './tests/config/teardown.ts',
  moduleNameMapper: {
    '^~(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./tests/config/database.ts'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.test.ts'],
}

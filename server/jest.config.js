/**
 * @file Jest config
 */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
  },
  testTimeout: 30000,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/node_modules/**'],
};

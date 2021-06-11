// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
export default {
  maxConcurrency: 3,
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
  restoreMocks: true,
  collectCoverage: !process.argv.includes('--watch'),
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['<rootDir>/site/**/*.{ts,tsx}', '<rootDir>/src/**/*.{ts,tsx}', '!<rootDir>/src/**/index.ts', '!<rootDir>/src/types/*.ts', '!<rootDir>/src/**/types.ts'],
  coverageProvider: 'v8',
  coverageReporters: ['cobertura', 'html', 'text-summary'],
  moduleNameMapper: {
    '^@material-ui/icons$': '<rootDir>/jest/iconsMock.ts',
    '\\.(css|less)$': '<rootDir>/jest/fileMock.ts'
  },
  setupFilesAfterEnv: ['./jest/setup.ts', '@testing-library/jest-dom'],
  testMatch: ['**/*.test.(ts|tsx)'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\](?!(@strata[/\\\\]one-strata-ui)[/\\\\]lib)']
};
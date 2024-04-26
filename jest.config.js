/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  globals: {
    'ts-jest': {
      tsconfig: 'src/tsconfig.spec.json',
      diagnostics: true,
      // stringifyContentPathRegex: '\\.html$',
    }
  },
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',  // Ignore modules in dist to prevent naming collisions
    // '<rootDir>/out*/',   // Ignore any other output directory that might be used
  ],
};

module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts{,x}'],
  globals: {
    'ts-jest': {
      tsConfig: '__tests__/tsconfig.json',
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/__tests__/**/*.test.ts{,x}'],
};

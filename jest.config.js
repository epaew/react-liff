module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts{,x}'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/__tests__/**/*.test.ts{,x}'],
};

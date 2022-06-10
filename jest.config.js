module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts{,x}',
    '!<rootDir>/src/**/*.test.ts{,x}',
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};

module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts{,x}'],
  globals: {
    'ts-jest': {
      tsconfig: '__tests__/tsconfig.json',
    },
  },
  moduleNameMapper: {
    '^#/(.+)': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/__tests__/**/*.test.ts{,x}'],
};

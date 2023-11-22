export default {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts{,x}', '!<rootDir>/src/**/*.test.ts{,x}'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  transform: {
    '\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json', useESM: true }],
  },
};

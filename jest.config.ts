import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    "**/**/*.ts",
    "!jest.config.ts",
    "!**/node_modules/**",
    "!**/dist/**",
    "!**/postgres/**",
  ]
};

export default config;
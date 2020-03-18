import { createConfig } from '../config';

export const TestConfig = createConfig('Test', { apis: [] });

declare module '../config' {
  export interface ConfigTypes {
    Test: typeof TestConfig;
  }
}

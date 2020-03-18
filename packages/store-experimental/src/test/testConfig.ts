import { createConfig } from '../config';

const MyConfig = createConfig('Test', { apis: [] });

declare module '../config' {
  export interface ConfigTypes {
    Test: typeof MyConfig;
  }
}

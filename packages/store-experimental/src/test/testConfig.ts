import { createConfig } from '../config';

const MyConfig = createConfig('Test', { apis: [] });

declare module '../config' {
  export interface Configs {
    Test: typeof MyConfig;
  }
}

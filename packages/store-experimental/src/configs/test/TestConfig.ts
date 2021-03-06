import {createConfig} from '../../config';

import {BarApi} from './apis/BarApi';
import {FooApi} from './apis/FooApi';

export const TestConfig = createConfig('Test', {
  apis: [FooApi, BarApi],
  slice: 'TestSlice',
});

declare module '../../config' {
  export interface ConfigTypes {
    Test: typeof TestConfig;
  }
}

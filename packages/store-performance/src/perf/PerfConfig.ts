import {createConfig} from '@cleric/store-experimental/src/config';

import {BarApi} from './apis/BarApi';
import {FooApi} from './apis/FooApi';

export const PerfConfig = createConfig('Perf', {
  apis: [FooApi, BarApi],
  slice: 'PerfSlice',
});

declare module '@cleric/store-experimental/src/config' {
  export interface ConfigTypes {
    Perf: typeof PerfConfig;
  }
}

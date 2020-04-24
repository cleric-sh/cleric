import {createConfig} from '@cleric/store-experimental/src/config';

import {RootApi} from './apis/RootApi';
import {Type1Api} from './apis/Type1Api';

export const PerfConfig = createConfig('Perf', {
  apis: [RootApi, Type1Api],
  slice: 'PerfSlice',
});

declare module '@cleric/store-experimental/src/config' {
  export interface ConfigTypes {
    Perf: typeof PerfConfig;
  }
}

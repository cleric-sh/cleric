import {createConfig} from '@cleric/store-experimental/src/config';

import {Type1Api} from './apis/Type1Api';
import {Type2Api} from './apis/Type2Api';
import {Type3Api} from './apis/Type3Api';
import {Type4Api} from './apis/Type4Api';
import {Type5Api} from './apis/Type5Api';

export const PerfConfig = createConfig('Perf', {
  apis: [Type1Api, Type2Api, Type3Api, Type4Api, Type5Api],
  slice: 'PerfSlice',
});

declare module '@cleric/store-experimental/src/config' {
  export interface ConfigTypes {
    Perf: typeof PerfConfig;
  }
}

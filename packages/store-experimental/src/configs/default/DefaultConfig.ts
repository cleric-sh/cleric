import {createConfig} from '../../config/createConfig';

import {InterfaceApi} from './apis/InterfaceApi';
import {IntersectionApi} from './apis/IntersectionApi';
// import {UnionApi} from './apis/UnionApi';

export const DefaultConfig = createConfig('Default', {
  // apis: [InterfaceApi, UnionApi, IntersectionApi],
  apis: [InterfaceApi, IntersectionApi],
  slice: 'SliceNode',
});

type blah = typeof DefaultConfig['_apiLookup'];

declare module '../../config' {
  export interface ConfigTypes {
    Default: typeof DefaultConfig;
  }
}

import {createConfig} from '../../config/createConfig';

import {InterfaceApi} from './apis/interface/InterfaceApi';
import {IntersectionApi} from './apis/intersection/IntersectionApi';
import {UnionApi} from './apis/union/UnionApi';

export const DefaultConfig = createConfig('Default', {
  apis: [InterfaceApi, UnionApi, IntersectionApi],
  slice: 'SliceNode',
});

declare module '../../config' {
  export interface ConfigTypes {
    Default: typeof DefaultConfig;
  }
}

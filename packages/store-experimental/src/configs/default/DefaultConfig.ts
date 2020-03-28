import {createConfig} from '../../config/createConfig';

import {InterfaceApi} from './apis/InterfaceApi';
import {IntersectionApi} from './apis/IntersectionApi';
import {UnionApi} from './apis/UnionApi';

export const DefaultConfig = createConfig(
    'Default',
    {apis : [ InterfaceApi, UnionApi, IntersectionApi ], slice : 'SliceNode'});

declare module '../../config' {
  export interface ConfigTypes {
    Default: typeof DefaultConfig;
  }
}

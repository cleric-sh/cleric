import { InterfaceApi } from '../apis/InterfaceApi';
import { UnionApi } from '../apis/UnionApi';
import { IntersectionApi } from '../apis/IntersectionApi';

import { Configs } from '.';

export const DefaultConfig = {
  apis: [InterfaceApi, UnionApi, IntersectionApi],
} as const;

declare module '.' {
  export interface Configs {
    Default: typeof DefaultConfig;
  }
}

Configs.Default = DefaultConfig;

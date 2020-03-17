import { InterfaceApi } from '../apis/InterfaceApi';
import { UnionApi } from '../apis/UnionApi';
import { IntersectionApi } from '../apis/IntersectionApi';
import { createConfig } from '.';

export const DefaultConfig = createConfig('Default', {
  apis: [InterfaceApi, UnionApi, IntersectionApi],
});

declare module '.' {
  export interface Configs {
    Default: typeof DefaultConfig;
  }
}

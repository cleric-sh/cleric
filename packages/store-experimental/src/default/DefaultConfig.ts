import { InterfaceApi } from './apis/InterfaceApi';
import { UnionApi } from './apis/UnionApi';
import { IntersectionApi } from './apis/IntersectionApi';
import { createConfig } from '../config/createConfig';

export const DefaultConfig = createConfig('Default', {
  apis: [InterfaceApi, UnionApi, IntersectionApi],
});

declare module '../config' {
  export interface ConfigTypes {
    Default: typeof DefaultConfig;
  }
}

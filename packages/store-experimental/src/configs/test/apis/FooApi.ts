import { createApi } from '../../../slice/api';
import * as t from 'io-ts';
import { ConfigKey } from '../../../config';
import { Foo } from '../types/Foo';

export const FooGuard = (type: t.Any): type is typeof Foo =>
  type instanceof t.InterfaceType && !!type.props['foo'];

export const FooApi = createApi('FooApi', FooGuard, (configKey, type, slice) => {
  slice['doFoo'] = () => 'Foo';
});

export type FooApi<TConfigKey extends ConfigKey, T extends t.Any> = T extends t.InterfaceType<
  infer P
>
  ? { doFoo: () => string }
  : never;

declare module '../../../slice/api' {
  export interface ApiTypes<TConfigKey, TType> {
    FooApi: FooApi<TConfigKey, TType>;
  }
}

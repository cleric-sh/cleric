import { createApi } from '../../slice/api';
import * as t from 'io-ts';
import { ConfigKey } from '../../config';

export const FooType = t.type({
  foo: t.string,
});

export const FooGuard = (type: t.Any): type is typeof FooType =>
  type instanceof t.InterfaceType && !!type.props['foo'];

export const FooApi = createApi('TestFoo', FooGuard, (configKey, type, slice) => {
  slice['doFoo'] = () => console.log('FOO!');
});

type FooApi<TConfigKey extends ConfigKey, T extends t.Any> = T extends t.InterfaceType<infer P>
  ? { $foo: void }
  : never;

declare module '../../slice/api' {
  export interface ApiTypes<TConfigKey, TType> {
    TestFoo: FooApi<TConfigKey, TType>;
  }
}

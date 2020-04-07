import * as t from 'io-ts';

import {ConfigKey} from '../../../config';
import {createApi} from '../../../node/api';
import {Foo} from '../types/Foo';

export const FooGuard = (type: unknown): type is Foo =>
  type instanceof t.InterfaceType && !!type.props['foo'];

export const FooApi = createApi('FooApi', FooGuard, slice => {
  slice['doFoo'] = () => 'Foo';
});

export type FooApi<
  TConfigKey extends ConfigKey,
  T extends t.Any
> = T extends t.InterfaceType<t.PropsOf<Foo>> ? {doFoo: () => string} : never;

declare module '../../../node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    FooApi: FooApi<TConfigKey, TType>;
  }
}

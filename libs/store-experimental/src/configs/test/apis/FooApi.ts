import * as t from 'io-ts';

import {createApi} from '../../../node/api';
import {Foo} from '../types/Foo';

export const FooGuard = (type: t.Any): type is Foo =>
  type instanceof t.InterfaceType && !!type.props['foo'];

export const FooApi = createApi('FooApi', FooGuard, slice => {
  slice['doFoo'] = () => 'Foo';
});

declare module '../../../node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    FooApi: TType extends t.InterfaceType<t.PropsOf<Foo>>
      ? {doFoo: () => string}
      : never;
  }
}

import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type28} from '../types/Type28';

export const Type28Guard = (type: t.Any): type is Type28 =>
  type instanceof t.InterfaceType && !!type.props['type28'];

export const Type28Api = createApi('Type28Api', Type28Guard, slice => {
  slice['doType28'] = () => 'Type28';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type28Api: TType extends t.InterfaceType<t.PropsOf<Type28>>
      ? {doType28: () => string}
      : never;
  }
}

import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type87} from '../types/Type87';

export const Type87Guard = (type: t.Any): type is Type87 =>
  type instanceof t.InterfaceType && !!type.props['type87'];

export const Type87Api = createApi('Type87Api', Type87Guard, slice => {
  slice['doType87'] = () => 'Type87';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type87Api: TType extends t.InterfaceType<t.PropsOf<Type87>>
      ? {doType87: () => string}
      : never;
  }
}

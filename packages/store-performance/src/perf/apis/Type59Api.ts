import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type59} from '../types/Type59';

export const Type59Guard = (type: t.Any): type is Type59 =>
  type instanceof t.InterfaceType && !!type.props['type59'];

export const Type59Api = createApi('Type59Api', Type59Guard, slice => {
  slice['doType59'] = () => 'Type59';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type59Api: TType extends t.InterfaceType<t.PropsOf<Type59>>
      ? {doType59: () => string}
      : never;
  }
}

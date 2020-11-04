import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type89} from '../types/Type89';

export const Type89Guard = (type: t.Any): type is Type89 =>
  type instanceof t.InterfaceType && !!type.props['type89'];

export const Type89Api = createApi('Type89Api', Type89Guard, slice => {
  slice['doType89'] = () => 'Type89';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type89Api: TType extends t.InterfaceType<t.PropsOf<Type89>>
      ? {doType89: () => string}
      : never;
  }
}

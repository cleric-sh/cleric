import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type26} from '../types/Type26';

export const Type26Guard = (type: t.Any): type is Type26 =>
  type instanceof t.InterfaceType && !!type.props['type26'];

export const Type26Api = createApi('Type26Api', Type26Guard, slice => {
  slice['doType26'] = () => 'Type26';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type26Api: TType extends t.InterfaceType<t.PropsOf<Type26>>
      ? {doType26: () => string}
      : never;
  }
}

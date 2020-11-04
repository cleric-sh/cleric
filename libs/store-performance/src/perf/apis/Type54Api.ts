import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type54} from '../types/Type54';

export const Type54Guard = (type: t.Any): type is Type54 =>
  type instanceof t.InterfaceType && !!type.props['type54'];

export const Type54Api = createApi('Type54Api', Type54Guard, slice => {
  slice['doType54'] = () => 'Type54';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type54Api: TType extends t.InterfaceType<t.PropsOf<Type54>>
      ? {doType54: () => string}
      : never;
  }
}

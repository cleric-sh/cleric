import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type6} from '../types/Type6';

export const Type6Guard = (type: t.Any): type is Type6 =>
  type instanceof t.InterfaceType && !!type.props['type6'];

export const Type6Api = createApi('Type6Api', Type6Guard, slice => {
  slice['doType6'] = () => 'Type6';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type6Api: TType extends t.InterfaceType<t.PropsOf<Type6>>
      ? {doType6: () => string}
      : never;
  }
}

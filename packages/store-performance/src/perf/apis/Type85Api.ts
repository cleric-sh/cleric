import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type85} from '../types/Type85';

export const Type85Guard = (type: t.Any): type is Type85 =>
  type instanceof t.InterfaceType && !!type.props['type85'];

export const Type85Api = createApi('Type85Api', Type85Guard, slice => {
  slice['doType85'] = () => 'Type85';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type85Api: TType extends t.InterfaceType<t.PropsOf<Type85>>
      ? {doType85: () => string}
      : never;
  }
}

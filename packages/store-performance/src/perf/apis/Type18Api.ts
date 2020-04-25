import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type18} from '../types/Type18';

export const Type18Guard = (type: t.Any): type is Type18 =>
  type instanceof t.InterfaceType && !!type.props['type18'];

export const Type18Api = createApi('Type18Api', Type18Guard, slice => {
  slice['doType18'] = () => 'Type18';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type18Api: TType extends t.InterfaceType<t.PropsOf<Type18>>
      ? {doType18: () => string}
      : never;
  }
}

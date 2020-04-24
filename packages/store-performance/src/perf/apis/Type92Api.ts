import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type92} from '../types/Type92';

export const Type92Guard = (type: t.Any): type is Type92 =>
  type instanceof t.InterfaceType && !!type.props['type92'];

export const Type92Api = createApi('Type92Api', Type92Guard, slice => {
  slice['doType92'] = () => 'Type92';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type92Api: TType extends t.InterfaceType<t.PropsOf<Type92>>
      ? {doType92: () => string}
      : never;
  }
}

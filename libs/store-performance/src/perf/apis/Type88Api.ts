import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type88} from '../types/Type88';

export const Type88Guard = (type: t.Any): type is Type88 =>
  type instanceof t.InterfaceType && !!type.props['type88'];

export const Type88Api = createApi('Type88Api', Type88Guard, slice => {
  slice['doType88'] = () => 'Type88';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type88Api: TType extends t.InterfaceType<t.PropsOf<Type88>>
      ? {doType88: () => string}
      : never;
  }
}

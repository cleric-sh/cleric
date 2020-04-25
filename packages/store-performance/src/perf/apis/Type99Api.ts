import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type99} from '../types/Type99';

export const Type99Guard = (type: t.Any): type is Type99 =>
  type instanceof t.InterfaceType && !!type.props['type99'];

export const Type99Api = createApi('Type99Api', Type99Guard, slice => {
  slice['doType99'] = () => 'Type99';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type99Api: TType extends t.InterfaceType<t.PropsOf<Type99>>
      ? {doType99: () => string}
      : never;
  }
}

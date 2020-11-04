import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type34} from '../types/Type34';

export const Type34Guard = (type: t.Any): type is Type34 =>
  type instanceof t.InterfaceType && !!type.props['type34'];

export const Type34Api = createApi('Type34Api', Type34Guard, slice => {
  slice['doType34'] = () => 'Type34';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type34Api: TType extends t.InterfaceType<t.PropsOf<Type34>>
      ? {doType34: () => string}
      : never;
  }
}

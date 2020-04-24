import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type63} from '../types/Type63';

export const Type63Guard = (type: t.Any): type is Type63 =>
  type instanceof t.InterfaceType && !!type.props['type63'];

export const Type63Api = createApi('Type63Api', Type63Guard, slice => {
  slice['doType63'] = () => 'Type63';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type63Api: TType extends t.InterfaceType<t.PropsOf<Type63>>
      ? {doType63: () => string}
      : never;
  }
}

import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type53} from '../types/Type53';

export const Type53Guard = (type: t.Any): type is Type53 =>
  type instanceof t.InterfaceType && !!type.props['type53'];

export const Type53Api = createApi('Type53Api', Type53Guard, slice => {
  slice['doType53'] = () => 'Type53';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type53Api: TType extends t.InterfaceType<t.PropsOf<Type53>>
      ? {doType53: () => string}
      : never;
  }
}

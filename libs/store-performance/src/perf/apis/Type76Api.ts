import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type76} from '../types/Type76';

export const Type76Guard = (type: t.Any): type is Type76 =>
  type instanceof t.InterfaceType && !!type.props['type76'];

export const Type76Api = createApi('Type76Api', Type76Guard, slice => {
  slice['doType76'] = () => 'Type76';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type76Api: TType extends t.InterfaceType<t.PropsOf<Type76>>
      ? {doType76: () => string}
      : never;
  }
}

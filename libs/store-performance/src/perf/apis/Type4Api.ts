import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type4} from '../types/Type4';

export const Type4Guard = (type: t.Any): type is Type4 =>
  type instanceof t.InterfaceType && !!type.props['type4'];

export const Type4Api = createApi('Type4Api', Type4Guard, slice => {
  slice['doType4'] = () => 'Type4';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type4Api: TType extends t.InterfaceType<t.PropsOf<Type4>>
      ? {doType4: () => string}
      : never;
  }
}

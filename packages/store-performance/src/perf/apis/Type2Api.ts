import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type2} from '../types/Type2';

export const Type2Guard = (type: t.Any): type is Type2 =>
  type instanceof t.InterfaceType && !!type.props['type2'];

export const Type2Api = createApi('Type2Api', Type2Guard, slice => {
  slice['doType2'] = () => 'Type2';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type2Api: TType extends t.InterfaceType<t.PropsOf<Type2>>
      ? {doType2: () => string}
      : never;
  }
}

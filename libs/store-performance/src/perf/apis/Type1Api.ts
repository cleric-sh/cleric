import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type1} from '../types/Type1';

export const Type1Guard = (type: t.Any): type is Type1 =>
  type instanceof t.InterfaceType && !!type.props['type1'];

export const Type1Api = createApi('Type1Api', Type1Guard, slice => {
  slice['doType1'] = () => 'Type1';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type1Api: TType extends t.InterfaceType<t.PropsOf<Type1>>
      ? {doType1: () => string}
      : never;
  }
}

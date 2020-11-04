import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type94} from '../types/Type94';

export const Type94Guard = (type: t.Any): type is Type94 =>
  type instanceof t.InterfaceType && !!type.props['type94'];

export const Type94Api = createApi('Type94Api', Type94Guard, slice => {
  slice['doType94'] = () => 'Type94';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type94Api: TType extends t.InterfaceType<t.PropsOf<Type94>>
      ? {doType94: () => string}
      : never;
  }
}

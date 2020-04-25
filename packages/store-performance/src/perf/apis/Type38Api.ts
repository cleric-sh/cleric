import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type38} from '../types/Type38';

export const Type38Guard = (type: t.Any): type is Type38 =>
  type instanceof t.InterfaceType && !!type.props['type38'];

export const Type38Api = createApi('Type38Api', Type38Guard, slice => {
  slice['doType38'] = () => 'Type38';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type38Api: TType extends t.InterfaceType<t.PropsOf<Type38>>
      ? {doType38: () => string}
      : never;
  }
}

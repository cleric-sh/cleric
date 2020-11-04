import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type31} from '../types/Type31';

export const Type31Guard = (type: t.Any): type is Type31 =>
  type instanceof t.InterfaceType && !!type.props['type31'];

export const Type31Api = createApi('Type31Api', Type31Guard, slice => {
  slice['doType31'] = () => 'Type31';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type31Api: TType extends t.InterfaceType<t.PropsOf<Type31>>
      ? {doType31: () => string}
      : never;
  }
}

import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type73} from '../types/Type73';

export const Type73Guard = (type: t.Any): type is Type73 =>
  type instanceof t.InterfaceType && !!type.props['type73'];

export const Type73Api = createApi('Type73Api', Type73Guard, slice => {
  slice['doType73'] = () => 'Type73';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type73Api: TType extends t.InterfaceType<t.PropsOf<Type73>>
      ? {doType73: () => string}
      : never;
  }
}

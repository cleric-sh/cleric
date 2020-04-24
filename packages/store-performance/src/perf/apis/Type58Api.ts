import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type58} from '../types/Type58';

export const Type58Guard = (type: t.Any): type is Type58 =>
  type instanceof t.InterfaceType && !!type.props['type58'];

export const Type58Api = createApi('Type58Api', Type58Guard, slice => {
  slice['doType58'] = () => 'Type58';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type58Api: TType extends t.InterfaceType<t.PropsOf<Type58>>
      ? {doType58: () => string}
      : never;
  }
}

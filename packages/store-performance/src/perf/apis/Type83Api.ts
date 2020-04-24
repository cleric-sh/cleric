import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type83} from '../types/Type83';

export const Type83Guard = (type: t.Any): type is Type83 =>
  type instanceof t.InterfaceType && !!type.props['type83'];

export const Type83Api = createApi('Type83Api', Type83Guard, slice => {
  slice['doType83'] = () => 'Type83';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type83Api: TType extends t.InterfaceType<t.PropsOf<Type83>>
      ? {doType83: () => string}
      : never;
  }
}

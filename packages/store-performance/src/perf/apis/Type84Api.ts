import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type84} from '../types/Type84';

export const Type84Guard = (type: t.Any): type is Type84 =>
  type instanceof t.InterfaceType && !!type.props['type84'];

export const Type84Api = createApi('Type84Api', Type84Guard, slice => {
  slice['doType84'] = () => 'Type84';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type84Api: TType extends t.InterfaceType<t.PropsOf<Type84>>
      ? {doType84: () => string}
      : never;
  }
}

import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type78} from '../types/Type78';

export const Type78Guard = (type: t.Any): type is Type78 =>
  type instanceof t.InterfaceType && !!type.props['type78'];

export const Type78Api = createApi('Type78Api', Type78Guard, slice => {
  slice['doType78'] = () => 'Type78';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type78Api: TType extends t.InterfaceType<t.PropsOf<Type78>>
      ? {doType78: () => string}
      : never;
  }
}

import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type67} from '../types/Type67';

export const Type67Guard = (type: t.Any): type is Type67 =>
  type instanceof t.InterfaceType && !!type.props['type67'];

export const Type67Api = createApi('Type67Api', Type67Guard, slice => {
  slice['doType67'] = () => 'Type67';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type67Api: TType extends t.InterfaceType<t.PropsOf<Type67>>
      ? {doType67: () => string}
      : never;
  }
}

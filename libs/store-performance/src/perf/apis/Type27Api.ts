import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type27} from '../types/Type27';

export const Type27Guard = (type: t.Any): type is Type27 =>
  type instanceof t.InterfaceType && !!type.props['type27'];

export const Type27Api = createApi('Type27Api', Type27Guard, slice => {
  slice['doType27'] = () => 'Type27';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type27Api: TType extends t.InterfaceType<t.PropsOf<Type27>>
      ? {doType27: () => string}
      : never;
  }
}

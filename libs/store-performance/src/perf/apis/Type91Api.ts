import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type91} from '../types/Type91';

export const Type91Guard = (type: t.Any): type is Type91 =>
  type instanceof t.InterfaceType && !!type.props['type91'];

export const Type91Api = createApi('Type91Api', Type91Guard, slice => {
  slice['doType91'] = () => 'Type91';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type91Api: TType extends t.InterfaceType<t.PropsOf<Type91>>
      ? {doType91: () => string}
      : never;
  }
}

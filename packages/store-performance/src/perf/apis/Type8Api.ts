import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type8} from '../types/Type8';

export const Type8Guard = (type: t.Any): type is Type8 =>
  type instanceof t.InterfaceType && !!type.props['type8'];

export const Type8Api = createApi('Type8Api', Type8Guard, slice => {
  slice['doType8'] = () => 'Type8';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type8Api: TType extends t.InterfaceType<t.PropsOf<Type8>>
      ? {doType8: () => string}
      : never;
  }
}

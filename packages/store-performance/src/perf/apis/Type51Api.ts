import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type51} from '../types/Type51';

export const Type51Guard = (type: t.Any): type is Type51 =>
  type instanceof t.InterfaceType && !!type.props['type51'];

export const Type51Api = createApi('Type51Api', Type51Guard, slice => {
  slice['doType51'] = () => 'Type51';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type51Api: TType extends t.InterfaceType<t.PropsOf<Type51>>
      ? {doType51: () => string}
      : never;
  }
}

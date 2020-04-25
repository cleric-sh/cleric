import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type44} from '../types/Type44';

export const Type44Guard = (type: t.Any): type is Type44 =>
  type instanceof t.InterfaceType && !!type.props['type44'];

export const Type44Api = createApi('Type44Api', Type44Guard, slice => {
  slice['doType44'] = () => 'Type44';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type44Api: TType extends t.InterfaceType<t.PropsOf<Type44>>
      ? {doType44: () => string}
      : never;
  }
}

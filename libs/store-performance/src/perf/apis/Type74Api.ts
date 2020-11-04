import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type74} from '../types/Type74';

export const Type74Guard = (type: t.Any): type is Type74 =>
  type instanceof t.InterfaceType && !!type.props['type74'];

export const Type74Api = createApi('Type74Api', Type74Guard, slice => {
  slice['doType74'] = () => 'Type74';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type74Api: TType extends t.InterfaceType<t.PropsOf<Type74>>
      ? {doType74: () => string}
      : never;
  }
}

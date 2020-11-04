import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type14} from '../types/Type14';

export const Type14Guard = (type: t.Any): type is Type14 =>
  type instanceof t.InterfaceType && !!type.props['type14'];

export const Type14Api = createApi('Type14Api', Type14Guard, slice => {
  slice['doType14'] = () => 'Type14';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type14Api: TType extends t.InterfaceType<t.PropsOf<Type14>>
      ? {doType14: () => string}
      : never;
  }
}

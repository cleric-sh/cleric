import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type12} from '../types/Type12';

export const Type12Guard = (type: t.Any): type is Type12 =>
  type instanceof t.InterfaceType && !!type.props['type12'];

export const Type12Api = createApi('Type12Api', Type12Guard, slice => {
  slice['doType12'] = () => 'Type12';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type12Api: TType extends t.InterfaceType<t.PropsOf<Type12>>
      ? {doType12: () => string}
      : never;
  }
}

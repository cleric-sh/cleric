import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type21} from '../types/Type21';

export const Type21Guard = (type: t.Any): type is Type21 =>
  type instanceof t.InterfaceType && !!type.props['type21'];

export const Type21Api = createApi('Type21Api', Type21Guard, slice => {
  slice['doType21'] = () => 'Type21';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type21Api: TType extends t.InterfaceType<t.PropsOf<Type21>>
      ? {doType21: () => string}
      : never;
  }
}

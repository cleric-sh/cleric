import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type47} from '../types/Type47';

export const Type47Guard = (type: t.Any): type is Type47 =>
  type instanceof t.InterfaceType && !!type.props['type47'];

export const Type47Api = createApi('Type47Api', Type47Guard, slice => {
  slice['doType47'] = () => 'Type47';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type47Api: TType extends t.InterfaceType<t.PropsOf<Type47>>
      ? {doType47: () => string}
      : never;
  }
}

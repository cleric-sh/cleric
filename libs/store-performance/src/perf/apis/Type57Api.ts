import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type57} from '../types/Type57';

export const Type57Guard = (type: t.Any): type is Type57 =>
  type instanceof t.InterfaceType && !!type.props['type57'];

export const Type57Api = createApi('Type57Api', Type57Guard, slice => {
  slice['doType57'] = () => 'Type57';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type57Api: TType extends t.InterfaceType<t.PropsOf<Type57>>
      ? {doType57: () => string}
      : never;
  }
}

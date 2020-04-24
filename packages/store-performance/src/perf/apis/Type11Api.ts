import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type11} from '../types/Type11';

export const Type11Guard = (type: t.Any): type is Type11 =>
  type instanceof t.InterfaceType && !!type.props['type11'];

export const Type11Api = createApi('Type11Api', Type11Guard, slice => {
  slice['doType11'] = () => 'Type11';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type11Api: TType extends t.InterfaceType<t.PropsOf<Type11>>
      ? {doType11: () => string}
      : never;
  }
}

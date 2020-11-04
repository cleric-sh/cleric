import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type52} from '../types/Type52';

export const Type52Guard = (type: t.Any): type is Type52 =>
  type instanceof t.InterfaceType && !!type.props['type52'];

export const Type52Api = createApi('Type52Api', Type52Guard, slice => {
  slice['doType52'] = () => 'Type52';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type52Api: TType extends t.InterfaceType<t.PropsOf<Type52>>
      ? {doType52: () => string}
      : never;
  }
}

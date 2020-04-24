import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type50} from '../types/Type50';

export const Type50Guard = (type: t.Any): type is Type50 =>
  type instanceof t.InterfaceType && !!type.props['type50'];

export const Type50Api = createApi('Type50Api', Type50Guard, slice => {
  slice['doType50'] = () => 'Type50';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type50Api: TType extends t.InterfaceType<t.PropsOf<Type50>>
      ? {doType50: () => string}
      : never;
  }
}

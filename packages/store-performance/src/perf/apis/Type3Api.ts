import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type3} from '../types/Type3';

export const Type3Guard = (type: t.Any): type is Type3 =>
  type instanceof t.InterfaceType && !!type.props['type3'];

export const Type3Api = createApi('Type3Api', Type3Guard, slice => {
  slice['doType3'] = () => 'Type3';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type3Api: TType extends t.InterfaceType<t.PropsOf<Type3>>
      ? {doType3: () => string}
      : never;
  }
}

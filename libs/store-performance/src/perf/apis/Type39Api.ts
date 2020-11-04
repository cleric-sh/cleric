import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type39} from '../types/Type39';

export const Type39Guard = (type: t.Any): type is Type39 =>
  type instanceof t.InterfaceType && !!type.props['type39'];

export const Type39Api = createApi('Type39Api', Type39Guard, slice => {
  slice['doType39'] = () => 'Type39';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type39Api: TType extends t.InterfaceType<t.PropsOf<Type39>>
      ? {doType39: () => string}
      : never;
  }
}

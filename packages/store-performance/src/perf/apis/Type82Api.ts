import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type82} from '../types/Type82';

export const Type82Guard = (type: t.Any): type is Type82 =>
  type instanceof t.InterfaceType && !!type.props['type82'];

export const Type82Api = createApi('Type82Api', Type82Guard, slice => {
  slice['doType82'] = () => 'Type82';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type82Api: TType extends t.InterfaceType<t.PropsOf<Type82>>
      ? {doType82: () => string}
      : never;
  }
}

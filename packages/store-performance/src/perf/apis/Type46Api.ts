import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type46} from '../types/Type46';

export const Type46Guard = (type: t.Any): type is Type46 =>
  type instanceof t.InterfaceType && !!type.props['type46'];

export const Type46Api = createApi('Type46Api', Type46Guard, slice => {
  slice['doType46'] = () => 'Type46';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type46Api: TType extends t.InterfaceType<t.PropsOf<Type46>>
      ? {doType46: () => string}
      : never;
  }
}

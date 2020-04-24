import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type77} from '../types/Type77';

export const Type77Guard = (type: t.Any): type is Type77 =>
  type instanceof t.InterfaceType && !!type.props['type77'];

export const Type77Api = createApi('Type77Api', Type77Guard, slice => {
  slice['doType77'] = () => 'Type77';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type77Api: TType extends t.InterfaceType<t.PropsOf<Type77>>
      ? {doType77: () => string}
      : never;
  }
}

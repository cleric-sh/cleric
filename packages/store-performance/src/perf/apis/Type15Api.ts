import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type15} from '../types/Type15';

export const Type15Guard = (type: t.Any): type is Type15 =>
  type instanceof t.InterfaceType && !!type.props['type15'];

export const Type15Api = createApi('Type15Api', Type15Guard, slice => {
  slice['doType15'] = () => 'Type15';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type15Api: TType extends t.InterfaceType<t.PropsOf<Type15>>
      ? {doType15: () => string}
      : never;
  }
}

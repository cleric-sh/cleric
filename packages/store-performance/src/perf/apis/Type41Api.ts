import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type41} from '../types/Type41';

export const Type41Guard = (type: t.Any): type is Type41 =>
  type instanceof t.InterfaceType && !!type.props['type41'];

export const Type41Api = createApi('Type41Api', Type41Guard, slice => {
  slice['doType41'] = () => 'Type41';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type41Api: TType extends t.InterfaceType<t.PropsOf<Type41>>
      ? {doType41: () => string}
      : never;
  }
}

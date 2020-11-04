import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type48} from '../types/Type48';

export const Type48Guard = (type: t.Any): type is Type48 =>
  type instanceof t.InterfaceType && !!type.props['type48'];

export const Type48Api = createApi('Type48Api', Type48Guard, slice => {
  slice['doType48'] = () => 'Type48';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type48Api: TType extends t.InterfaceType<t.PropsOf<Type48>>
      ? {doType48: () => string}
      : never;
  }
}

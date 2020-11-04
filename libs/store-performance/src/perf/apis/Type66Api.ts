import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type66} from '../types/Type66';

export const Type66Guard = (type: t.Any): type is Type66 =>
  type instanceof t.InterfaceType && !!type.props['type66'];

export const Type66Api = createApi('Type66Api', Type66Guard, slice => {
  slice['doType66'] = () => 'Type66';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type66Api: TType extends t.InterfaceType<t.PropsOf<Type66>>
      ? {doType66: () => string}
      : never;
  }
}

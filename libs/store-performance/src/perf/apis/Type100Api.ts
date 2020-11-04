import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type100} from '../types/Type100';

export const Type100Guard = (type: t.Any): type is Type100 =>
  type instanceof t.InterfaceType && !!type.props['type100'];

export const Type100Api = createApi('Type100Api', Type100Guard, slice => {
  slice['doType100'] = () => 'Type100';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type100Api: TType extends t.InterfaceType<t.PropsOf<Type100>>
      ? {doType100: () => string}
      : never;
  }
}

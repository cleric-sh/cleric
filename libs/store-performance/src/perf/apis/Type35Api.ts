import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type35} from '../types/Type35';

export const Type35Guard = (type: t.Any): type is Type35 =>
  type instanceof t.InterfaceType && !!type.props['type35'];

export const Type35Api = createApi('Type35Api', Type35Guard, slice => {
  slice['doType35'] = () => 'Type35';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type35Api: TType extends t.InterfaceType<t.PropsOf<Type35>>
      ? {doType35: () => string}
      : never;
  }
}

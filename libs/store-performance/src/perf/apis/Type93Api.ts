import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type93} from '../types/Type93';

export const Type93Guard = (type: t.Any): type is Type93 =>
  type instanceof t.InterfaceType && !!type.props['type93'];

export const Type93Api = createApi('Type93Api', Type93Guard, slice => {
  slice['doType93'] = () => 'Type93';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type93Api: TType extends t.InterfaceType<t.PropsOf<Type93>>
      ? {doType93: () => string}
      : never;
  }
}

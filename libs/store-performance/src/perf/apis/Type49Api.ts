import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type49} from '../types/Type49';

export const Type49Guard = (type: t.Any): type is Type49 =>
  type instanceof t.InterfaceType && !!type.props['type49'];

export const Type49Api = createApi('Type49Api', Type49Guard, slice => {
  slice['doType49'] = () => 'Type49';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type49Api: TType extends t.InterfaceType<t.PropsOf<Type49>>
      ? {doType49: () => string}
      : never;
  }
}

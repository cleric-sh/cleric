import { Tuple } from 'ts-toolbelt';
import { Slice } from '.';
import * as t from 'io-ts';
import { isArray } from 'lodash';
import { createSlice } from '../createSlice';
import { filter } from 'rxjs/operators';
// import { decorateSlice } from '../decorateSlice';
import { ConfigKey } from '../config';
import { SliceApi } from './SliceApi';

export const isUnionType = (type: t.Any): type is t.UnionType<t.Any[]> =>
  type instanceof t.UnionType;

export const UnionApi = SliceApi(
  'Union',
  isUnionType,
  (configKey, type, SliceNode) =>
    class extends SliceNode {
      private $subSlices: Slice<ConfigKey, t.Any>[] = [];

      constructor(...args: any[]) {
        super(args);

        if (!isArray(this.$type.types)) throw 'This should never happen...';

        // for (const subType of this.$type.types) {
        //   decorateSlice(this.configKey, subType, this);
        // }
      }

      $is = (guard: t.Any) => {
        const index = this.$type.types.findIndex(t => t === guard);

        if (index < 0) throw `Don't recognise this type...`;

        const type = this.$type.types[index];

        if (!this.$subSlices[index]) {
          const option$ = this.$.pipe(filter(type.is));
          this.$subSlices[index] = createSlice(type, option$, this.$configKey);
        }

        return this.$subSlices[index];
      };
    },
);
// export const UnionApi = SliceApi('Union', isUnionType, (apis, type, slice) => {
//   if (!isArray(type.types)) throw 'This should never happen...';

//   for (const subType of type.types) {
//     decorateSlice(apis, subType, slice);
//   }

//   const nodeCreators = type.types.map(t => () => {
//     const option$ = slice.$.pipe(filter(t.is));
//     return createSlice(t, option$, apis);
//   });

//   const nodes = [];

//   slice['$is'] = (guard: t.Any) => {
//     const index = type.types.findIndex(t => t === guard);
//     if (index < 0) throw `Don't recognise this type...`;
//     if (!nodes[index]) nodes[index] = nodeCreators[index]();
//     return nodes[index];
//   };

//   return slice;
// });

export type UnionApi<TConfigKey extends ConfigKey, T extends t.Any> = T extends t.UnionType<
  infer TCS
>
  ? {
      $is: <TSubType extends Tuple.UnionOf<TCS>>(type: TSubType) => Slice<TConfigKey, TSubType>;
    }
  : never;

declare module '.' {
  export interface ApiTypes<TConfigKey, TType> {
    Union: UnionApi<TConfigKey, TType>;
  }
}

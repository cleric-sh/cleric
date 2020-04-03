import * as t from 'io-ts';
import {filter} from 'rxjs/operators';
import {Tuple} from 'ts-toolbelt';

import {ConfigKey} from '../../../config';
import {createApi} from '../../../node/api';
import {SliceNode} from '../../../slice/node/SliceNode';
import {Slice} from '../../../slice/Slice';

export type UnionApi<
  TConfigKey extends ConfigKey,
  T extends t.Any
> = T extends t.UnionType<infer TCS>
  ? {
      $is: <TSubType extends Tuple.UnionOf<TCS>>(
        type: TSubType
      ) => Slice<TConfigKey, T, TSubType>;
    }
  : never;

declare module '../../../node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Union: UnionApi<TConfigKey, TType>;
  }
}

export const isUnionType = (type: t.Any): type is t.UnionType<t.Any[]> =>
  type instanceof t.UnionType;

export const UnionApi = createApi('Union', isUnionType, (_, type, slice) => {
  const configKey = slice.$configKey;
  const subSlices: Slice<typeof configKey, t.Any, t.Any>[] = [];

  slice['$is'] = (guard: t.Any) => {
    const index = type.types.findIndex(t => t === guard);

    if (index < 0) throw `Don't recognise this type...`;

    const subType = type.types[index];

    if (!subSlices[index]) {
      subSlices[index] = new SliceNode(slice, subType, parent$ =>
        parent$.pipe(filter(subType.is))
      ) as any;
    }

    return subSlices[index];
  };
});

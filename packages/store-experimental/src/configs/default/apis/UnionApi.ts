import { Tuple } from 'ts-toolbelt';
import * as t from 'io-ts';
import { filter } from 'rxjs/operators';
import { ConfigKey } from '../../../config';
import { createApi } from '../../../slice/api';
import { SliceNode } from '../../../slice/node/SliceNode';
import { Slice } from '../../../slice/Slice';

export type UnionApi<TConfigKey extends ConfigKey, T extends t.Any> = T extends t.UnionType<
  infer TCS
>
  ? {
    $is: <TSubType extends Tuple.UnionOf<TCS>>(type: TSubType) => Slice<TConfigKey, TSubType>;
  }
  : never;

declare module '../../../slice/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Union: UnionApi<TConfigKey, TType>;
  }
}

export const isUnionType = (type: t.Any): type is t.UnionType<t.Any[]> =>
  type instanceof t.UnionType;

export const UnionApi = createApi('Union', isUnionType, (configKey, type, slice) => {
  const subSlices: Slice<ConfigKey, t.Any>[] = [];

  slice['$is'] = (guard: t.Any) => {
    const index = type.types.findIndex(t => t === guard);

    if (index < 0) throw `Don't recognise this type...`;

    const subType = type.types[index];

    if (!subSlices[index]) {
      const option$ = slice.$.pipe(filter(subType.is));
      subSlices[index] = new SliceNode(subType, option$, configKey);
    }

    return subSlices[index];
  };
});

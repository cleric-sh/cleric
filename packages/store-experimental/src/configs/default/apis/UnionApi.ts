import * as t from 'io-ts';
import {filter} from 'rxjs/operators';
import {Tuple} from 'ts-toolbelt';

import {ConfigKey} from '../../../config';
import {createApi} from '../../../node/api';
import {SliceNode} from '../../../slice/node/SliceNode';
import {_Slice} from '../../../slice/Slice';

declare module '../../../node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Union: TType extends t.UnionType<infer TCS>
      ? {
          $is: <TSubType extends Tuple.UnionOf<TCS>>(
            type: TSubType
          ) => _Slice<TConfigKey, TType, TSubType>;
        }
      : never;
  }
}

export const isUnionType = (type: t.Any): type is t.UnionType<t.Any[]> =>
  type instanceof t.UnionType;

export const UnionApi = createApi('Union', isUnionType, (node, type) => {
  const subSlices: _Slice<ConfigKey, t.Any, t.Any>[] = [];

  node['$is'] = (guard: t.Any) => {
    const index = type.types.findIndex(t => t === guard);

    if (index < 0) throw `Don't recognise this type...`;

    const subType = type.types[index];

    if (!subSlices[index]) {
      subSlices[index] = new SliceNode(
        node,
        subType,
        parent$ => parent$.pipe(filter(subType.is))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any;
    }

    return subSlices[index];
  };
});

import {Compute} from 'Any/_api';
import {Tuple, Union} from 'ts-toolbelt';
import {MaybePromise} from '../../util/MaybePromise';
import {Placeholder} from './Placeholder';
import {Template} from './Template';

export type PlaceholderExports<TPlaceholders extends Placeholder[]> = Compute<
  Union.IntersectOf<
    Tuple.UnionOf<
      {
        [P in keyof TPlaceholders]: TPlaceholders[P] extends MaybePromise<
          Template<infer Exports>
        >
          ? Exports
          : never;
      }
    >
  >
>;

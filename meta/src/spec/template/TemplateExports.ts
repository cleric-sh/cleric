import {Tuple, Union} from 'ts-toolbelt';
import {MaybePromise} from '../../util/MaybePromise';
import {Export} from '../Export';
import {Placeholder} from './Placeholder';

export type TemplateExports<TPlaceholders extends Placeholder[]> = Union.Merge<
  Tuple.UnionOf<
    {
      [P in keyof TPlaceholders]: TPlaceholders[P] extends MaybePromise<
        Export<infer N>
      >
        ? {
            [K in N]: TPlaceholders[P];
          }
        : never;
    }
  >
>;

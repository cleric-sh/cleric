import {Tuple, Union} from 'ts-toolbelt';
import {MaybePromise} from '../util/MaybePromise';
import {Export} from './Export';
import {TemplateArgs} from './TemplateArgs';

export type TemplateExports<TArgs extends TemplateArgs> = Union.Merge<
  Tuple.UnionOf<
    {
      [P in keyof TArgs]: TArgs[P] extends MaybePromise<Export<infer N>>
        ? {
            [K in N]: TArgs[P];
          }
        : never;
    }
  >
>;

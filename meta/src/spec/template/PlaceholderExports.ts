import {Cast} from 'Any/Cast';
import {Compute} from 'Any/_api';
import {PromiseOf} from 'Class/_api';
import {Tuple, Union} from 'ts-toolbelt';
import {MaybePromise} from '../../util/MaybePromise';
import {Placeholder} from './Placeholder';
import {Template} from './Template';
import {TemplateExports} from './TemplateExports';

export type PlaceholderExports<TPhs extends Placeholder[]> = Compute<
  Union.IntersectOf<
    Tuple.UnionOf<
      {
        [P in keyof TPhs]: TPhs[P] extends MaybePromise<Template<Placeholder[]>>
          ? TemplateExports<Cast<PromiseOf<TPhs[P]>, Template<Placeholder[]>>>
          : never;
      }
    >
  >
>;

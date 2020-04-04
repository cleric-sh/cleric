import {Type} from 'Any/Type';
import {Cast} from 'Any/Cast';

export type NotSet = Type<'not_set', 'not_set'>;

export type Defer<T, TAs = NotSet> = T extends infer X
  ? TAs extends NotSet
    ? X
    : Cast<X, TAs>
  : never;

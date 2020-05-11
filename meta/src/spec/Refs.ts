import {Ref} from './Ref';

export type Refs<TExports> = {
  [K in keyof TExports]: Refs<TExports[K]>;
} & {
  _ref: Ref;
};

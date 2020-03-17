/* eslint-disable sonarjs/no-duplicate-string */
import { TError } from './TError';
import { checks, check, Pass } from 'Test';
import { Any } from 'ts-toolbelt';

describe('TError', () => {
  it('Can use an abstract class as a Type error.', () => {
    type Test<T> = T extends string ? true : TError<'This should never happen'>;

    checks([check<Test<boolean>, TError<'This should never happen'>, Pass>()]);
  });

  it('All TError messages are assignable to TError<string>', () => {
    checks([check<Any.Extends<TError<'Some message'>, TError<string>>, 1, Pass>()]);
  });

  it('A TError message is assignable to TError of a union including it', () => {
    checks([
      check<
        Any.Extends<TError<'Some message'>, TError<'Some message' | 'Some other message'>>,
        1,
        Pass
      >(),
    ]);
  });
});

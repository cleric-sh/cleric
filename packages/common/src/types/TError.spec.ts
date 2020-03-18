/* eslint-disable sonarjs/no-duplicate-string */
import { TError, TryCatch } from './TError';
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

describe('TryCatch', () => {
  it('Handles TError case in conditionals', () => {
    /**
     * WIP trying to figure out a nice pattern for better error messages in types.
     */
    type MyType<T> = T extends boolean ? 'Yes' : TError<'T must be boolean'>;

    type ExpectsYes<T extends 'Yes'> = T extends 'Yes' ? 1 : 0;

    type actual<T extends boolean> = ExpectsYes<MyType<T>>;
  });
});

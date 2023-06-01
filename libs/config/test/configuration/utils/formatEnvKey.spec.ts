import {throws} from 'assert';
import {formatEnvKey} from '../../../src/configuration/utils/formatEnvKey';

describe('formatEnvKey', () => {
  it('inserts underscores between camel case tokens', () => {
    const out = formatEnvKey('lower1CamelCase');
    expect(out).toBe('LOWER_1_CAMEL_CASE');
  });

  it('preserves underscores', () => {
    const out = formatEnvKey('already_split_terms');
    expect(out).toBe('ALREADY_SPLIT_TERMS');
  });

  it('preserves consecutive capitals', () => {
    const out = formatEnvKey('ALREADY_split_terms');
    expect(out).toBe('ALREADY_SPLIT_TERMS');
  });

  it('throws Error when invalid characters exist', () => {
    throws(
      () => {
        formatEnvKey('@');
      },
      e => {
        return (
          e instanceof Error && e.message === "String '@' can't be formatted as a valid Env key."
        );
      }
    );
  });
});

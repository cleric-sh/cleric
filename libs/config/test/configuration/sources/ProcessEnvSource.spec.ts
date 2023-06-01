import {ProcessEnvSource} from '../../../src/configuration/sources/ProcessEnvSource';

function testGetFromProcessEnv(prefix: string[], path: string[], expectedEnvKey: string) {
  process.env[expectedEnvKey] = 'FOO';
  const source = new ProcessEnvSource(prefix);
  const value = source.get({}, ...path);
  expect(value).toBe('FOO');
}

describe('ProcessEnvSource', () => {
  it('gets value from process.env in using .Net default format', () => {
    testGetFromProcessEnv([], ['testValue'], 'TEST_VALUE');
    testGetFromProcessEnv(['Foo', 'Bar'], ['testValue'], 'FOO__BAR__TEST_VALUE');
    testGetFromProcessEnv([], ['testValue', 'subValue'], 'TEST_VALUE__SUB_VALUE');
    testGetFromProcessEnv(['Foo'], ['testValue', 'subValue'], 'FOO__TEST_VALUE__SUB_VALUE');
  });
});

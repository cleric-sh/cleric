import {ConfigFileSource} from '../../../src/configuration/sources/ConfigFileSource';
import {createJsonFile} from '../../_tools/createJsonFile';

describe('ConfigFileSource', () => {
  const path = './dist/test/ConfigFileSource.spec.json';
  createJsonFile(path, {
    Value: {
      NestedValue: 'Foo',
    },
  });
  const source = new ConfigFileSource(path);

  it('gets value at key from json file', async () => {
    const value = source.get({}, 'Value');
    expect(value).toStrictEqual({NestedValue: 'Foo'});
  });

  it('gets nested value at path from json file', async () => {
    const value = source.get({}, 'Value', 'NestedValue');
    expect(value).toStrictEqual('Foo');
  });
});

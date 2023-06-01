import {USE_METADATA_KEY, Use} from '../../../src/configuration/decorators/Use';

describe('Use', () => {
  it('appends sources under USE_METADATA_KEY as array', () => {
    @Use('ProcessEnv', 'ConfigFile')
    class MyClass {}

    const sources = Reflect.getMetadata(USE_METADATA_KEY, MyClass);
    expect(sources).toStrictEqual(['ProcessEnv', 'ConfigFile']);
  });
});

import {Block} from '../../../src/configuration/decorators/Block';
import {Use} from '../../../src/configuration/decorators/Use';
import {getChildSourcePaths} from '../../../src/configuration/populate/getChildSourcePaths';
import {SourcePaths} from '../../../src/configuration/populate/getSourcePaths';

describe('getChildSourceCursor', () => {
  it('pushes property onto paths', () => {
    const parent: SourcePaths = {
      ConfigFile: ['foo'],
      ProcessEnv: ['foo'],
    };

    class MyClass {
      bar = '';
    }

    const next = getChildSourcePaths(parent, new MyClass(), 'bar');

    expect(next).toStrictEqual({
      ConfigFile: ['foo', 'bar'],
      ProcessEnv: ['foo', 'bar'],
    });
  });

  it('creates new cursor entry when Use on property', () => {
    const parent: SourcePaths = {
      ConfigFile: ['foo'],
      ProcessEnv: ['foo'],
    };

    class MyClass {
      @Use('ConfigFile')
      bar = '';
    }

    const next = getChildSourcePaths(parent, new MyClass(), 'bar');

    expect(next).toStrictEqual({
      ConfigFile: [],
      ProcessEnv: ['foo', 'bar'],
    });
  });

  it('removes cursor entry when Block on property', () => {
    const parent: SourcePaths = {
      ConfigFile: ['foo'],
      ProcessEnv: ['foo'],
    };

    class MyClass {
      @Block('ConfigFile')
      bar = '';
    }

    const next = getChildSourcePaths(parent, new MyClass(), 'bar');

    expect(next).toStrictEqual({
      ProcessEnv: ['foo', 'bar'],
    });
  });

  it('allows re-applying sources after blocked', () => {
    const parent: SourcePaths = {
      ConfigFile: ['foo'],
      ProcessEnv: ['foo'],
    };

    class MyClass {
      @Block('ConfigFile')
      @Use('ConfigFile')
      bar = '';
    }

    const next = getChildSourcePaths(parent, new MyClass(), 'bar');

    expect(next).toStrictEqual({
      ConfigFile: [],
      ProcessEnv: ['foo', 'bar'],
    });
  });
});

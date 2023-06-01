import {SourcePaths} from '../../../src/configuration/populate/getSourcePaths';
import {removeSourcesFromCursor} from '../../../src/configuration/populate/removeSourcesFromCursor';

describe('removeSourceFromCursor', () => {
  it('is immutable', () => {
    const cursor: SourcePaths = {
      ConfigFile: ['foo'],
      ProcessEnv: ['foo'],
      ServicesSecret: ['foo'],
    };
    const newCursor = removeSourcesFromCursor(cursor, ['ProcessEnv', 'ConfigFile']);
    expect(newCursor).toStrictEqual({ServicesSecret: ['foo']});
    expect(cursor).toStrictEqual({
      ConfigFile: ['foo'],
      ProcessEnv: ['foo'],
      ServicesSecret: ['foo'],
    });
  });
});

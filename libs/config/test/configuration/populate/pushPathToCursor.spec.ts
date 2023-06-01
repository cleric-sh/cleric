import {SourcePaths} from '../../../src/configuration/populate/getSourcePaths';
import {pushPathToCursor} from '../../../src/configuration/populate/pushPathToCursor';
import {removeSourcesFromCursor} from '../../../src/configuration/populate/removeSourcesFromCursor';

describe('pushPathToCursor', () => {
  it('is immutable', () => {
    const cursor: SourcePaths = {ConfigFile: ['foo'], ProcessEnv: ['foo']};
    const newCursor = pushPathToCursor(cursor, 'bar');
    expect(newCursor).toStrictEqual({ConfigFile: ['foo', 'bar'], ProcessEnv: ['foo', 'bar']});
    expect(cursor).toStrictEqual({ConfigFile: ['foo'], ProcessEnv: ['foo']});
  });
});

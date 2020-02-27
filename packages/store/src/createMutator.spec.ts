import { createMutator } from './createMutator';

describe('createMutator', () => {
  it('should', () => {
    const [mutations, mutator] = createMutator<{ test: string; foo?: number }>();
    mutator.test.$set('foo');
    mutator.foo?.$delete();
    expect(mutations).toMatchObject([
      { path: ['test'], state: 'foo', type: 'SET' },
      { path: ['foo'], state: undefined, type: 'DELETE' },
    ]);
  });
});

import {createMutator} from './createMutator';

describe('createMutator', () => {
  it('should', () => {
    const [mutations, mutator] = createMutator<{test: string; foo?: number}>();

    mutator.test.$set('foo');
    mutator.foo?.$delete();
    mutator.$merge({foo: 123});

    expect(mutations).toMatchObject([
      {path: ['test'], state: 'foo', type: 'SET'},
      {path: ['foo'], state: undefined, type: 'DELETE'},
      {path: [], state: {foo: 123}, type: 'MERGE'},
    ]);
  });
});

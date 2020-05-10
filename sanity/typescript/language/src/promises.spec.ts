import {Pass, check, checks} from '@cleric/common';

describe('promises', () => {
  it('can be annotated with e.g. the expected return type', async () => {
    /**
     * Given an array of promises, if a promise can return multiple types and we
     * want to treat each return type differently, we would have to wait until all
     * the promises are completed before we could be sure that we have all the instances
     * of each type.
     *
     * Annotating each promise with the type of the return value allows us to group the
     * promises and respond already when that group has completed, instead of when all of them
     * complete.
     */

    const fooMaker = async () => 'fooValue';

    const actual = fooMaker();
    actual['__type'] = 'foo';
    expect(actual['__type']).toBe('foo');
    expect(await actual).toBe('fooValue');
  });
});

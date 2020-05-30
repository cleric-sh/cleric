import {Pass, check, checks} from '@cleric/common';
import {createRefs} from './createRefs';

describe('createRefs', () => {
  it('should do stuff', () => {
    const actual = {};

    expect(actual).toStrictEqual({});

    checks([check<typeof actual, {}, Pass>()]);
  });
});

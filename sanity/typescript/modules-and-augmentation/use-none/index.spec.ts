import {getShared} from '@sanity/core';

import {Pass, check, checks} from '@cleric/common';

describe('getShared', () => {
  it('loads from modules', () => {
    const s = getShared();

    checks([check<typeof s, {}, Pass>()]);

    expect(s).toStrictEqual({});
  });
});

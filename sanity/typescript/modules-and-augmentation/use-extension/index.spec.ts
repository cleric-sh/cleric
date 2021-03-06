import {getShared} from '@sanity/core';

import '@sanity/extension';

import {Pass, check, checks} from '@cleric/common';

describe('getShared', () => {
  it('loads from modules', () => {
    const s = getShared();
    checks([
      check<
        typeof s,
        {
          extension: 'EXTENSION';
        },
        Pass
      >(),
    ]);

    expect(s).toStrictEqual({
      extension: 'EXTENSION',
    });
  });
});

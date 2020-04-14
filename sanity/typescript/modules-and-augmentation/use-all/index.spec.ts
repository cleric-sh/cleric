import {getShared} from '@sanity/core';

import '@sanity/extension';

import '@sanity/core/src/relative';
import '@sanity/core/src/extraneous';

import {checks, check, Pass} from '@cleric/common';

describe('getShared', () => {
  it('loads from modules', () => {
    const s = getShared();

    checks([
      check<
        typeof s,
        {
          extension: 'EXTENSION';
          relative: 'RELATIVE';
          extraneous: 'EXTRANEOUS';
        },
        Pass
      >(),
    ]);

    expect(s).toStrictEqual({
      extension: 'EXTENSION',
      relative: 'RELATIVE',
      extraneous: 'EXTRANEOUS',
    });
  });
});

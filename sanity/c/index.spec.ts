import {getShared} from '@sanity/a';

import '@sanity/b';

import '@sanity/a/relative';
import '@sanity/a/extraneous';

import {checks, check, Fail, Pass} from '@cleric/common';

describe('getShared', () => {
  it('loads from modules', () => {
    const s = getShared();

    checks([
      check<
        typeof s,
        {b: 'B'; relative: 'RELATIVE'; extraneous: 'EXTRANEOUS'},
        Pass
      >(),
    ]);

    expect(s).toStrictEqual({
      b: 'B',
      relative: 'RELATIVE',
      extraneous: 'EXTRANEOUS',
    });
  });
});

import '@sanity/a/relative';
import '@sanity/a/extraneous';

import {Shared} from '@sanity/a/shared';

import {checks, check, Fail, Pass} from '@cleric/common';
import {getShared} from '..';

describe('extraneous import of public augmentation', () => {
  it(`applies public, doesn't apply private`, () => {
    checks([
      check<Shared, {relative: 'RELATIVE'; extraneous: 'EXTRANEOUS'}, Pass>(),
    ]);

    const shared = getShared();
    expect(shared.extraneous).toBe('EXTRANEOUS');
    expect(shared.relative).toBe('RELATIVE');
  });
});

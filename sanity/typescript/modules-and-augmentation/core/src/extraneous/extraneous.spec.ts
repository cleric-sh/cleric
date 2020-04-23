import '@sanity/core/src/extraneous';
import '@sanity/core/src/relative';

import {Shared} from '@sanity/core/src/shared';

import {Pass, check, checks} from '@cleric/common';
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

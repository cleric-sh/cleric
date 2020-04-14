import '@sanity/core/src/relative';
import '@sanity/core/src/extraneous';

import {Shared} from '@sanity/core/src/shared';

import {checks, check, Pass} from '@cleric/common';
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

import '.';
import '../extraneous';

import {Shared} from '../shared';

import {Pass, check, checks} from '@cleric/common';
import {getShared} from '..';

describe('relative import of public augmentation', () => {
  it(`doesn't apply public, keeps private`, () => {
    checks([
      check<Shared, {relative: 'RELATIVE'; extraneous: 'EXTRANEOUS'}, Pass>(),
    ]);
    const shared = getShared();
    expect(shared.extraneous).toBe('EXTRANEOUS');
    expect(shared.relative).toBe('RELATIVE');
  });
});

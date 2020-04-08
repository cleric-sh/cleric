import './configs/default';

import {checks, check, Pass} from '@cleric/common';
import {getConfig} from './config';

describe('index', () => {
  it('should do stuff', () => {
    const config = getConfig('Default');
    console.log(config);

    const actual = {};

    expect(actual).toStrictEqual({});

    checks([check<typeof actual, {}, Pass>()]);
  });
});

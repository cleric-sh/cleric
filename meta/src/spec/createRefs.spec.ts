import {Pass, check, checks} from '@cleric/common';
import {Spec} from './Spec';
import {createRefs} from './createRefs';
import {f} from './file/f';
import {t} from './template/t';

describe('createRefs', () => {
  it.only('should do stuff', () => {
    const actual = {};

    const spec: Spec = () => [f('foo.ts', t('foo')`This exports a foo.`)];

    const refs = createRefs(spec);

    expect(actual).toStrictEqual({});

    checks([check<typeof actual, {}, Pass>()]);
  });
});

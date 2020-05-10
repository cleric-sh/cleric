import {Pass, check, checks} from '@cleric/common';
import {Template} from './Template';
import {isTemplate} from './isTemplate';

describe('isTemplate', () => {
  it('should do stuff', () => {
    const value = {
      __type: 'Template',
    };
    const actual = isTemplate(value);

    expect(actual).toStrictEqual(true);

    if (isTemplate(value)) {
      checks([check<typeof value, Template, Pass>()]);
    }
  });
});

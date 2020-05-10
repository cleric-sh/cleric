import {Pass, check, checks} from '@cleric/common';
import {KeyedTemplate, Template} from './Template';
import {TemplateExports} from './TemplateExports';

describe('TemplateExports', () => {
  it('merge keyed templates', () => {
    type actual = TemplateExports<KeyedTemplate<'foo', []>>;

    type expected = {
      foo: {};
    };

    checks([check<actual, expected, Pass>()]);
  });

  it('ignore unkeyed templates', () => {
    type actual = TemplateExports<Template<[]>>;

    type expected = {};

    checks([check<actual, expected, Pass>()]);
  });

  it('pass through keyed children of unkeyed templates', () => {
    type actual = TemplateExports<Template<[KeyedTemplate<'foo', []>]>>;

    type expected = {
      foo: {};
    };

    checks([check<actual, expected, Pass>()]);
  });
});

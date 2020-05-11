import {t} from './t';

describe('tpl', () => {
  it('when no key provied, should pass through exports of nested templates', async () => {
    const actual = await t`foo: ${t('bar')``}`;
  });
});

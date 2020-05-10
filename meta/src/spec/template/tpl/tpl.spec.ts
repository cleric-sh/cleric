import {tpl} from './tpl';

describe('tpl', () => {
  it('when no key provied, should pass through exports of nested templates', async () => {
    const actual = await tpl`foo: ${tpl('bar')``}`;
  });
});

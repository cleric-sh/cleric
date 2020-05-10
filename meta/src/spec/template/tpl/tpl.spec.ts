import {tpl} from './tpl';

describe('tpl', () => {
  it('should do stuff', async () => {
    const bar = tpl('bar')` bing`;
    const foo = tpl('foo')` bar ${bar} `;
    const actual = await tpl` narf ${foo}`;
  });
});

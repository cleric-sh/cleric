import {json} from './json';

describe('jsonFile', () => {
  const jsonStr = '{ "test": "value" }';
  const jsonObj = {test: 'value'};
  const formatted = `{
  "test": "value"
}`;

  it('accepts plain string, without schema', async () => {
    const actual = json(undefined)(jsonStr);
    expect(await actual).toBe(formatted);
  });

  it('fails on invalid json string, without schema', async () => {
    expect(async () => await json(undefined)('rubbish')).toThrow();
  });

  it('accepts plain object, without schema', async () => {
    const actual = json(undefined)(jsonObj);
    expect(await actual).toBe(formatted);
  });

  it('accepts tagged template literals, without schema', async () => {
    const actual = json(undefined)`{ "test": "value" }`;
    expect(await actual).toBe(formatted);
  });

  it('fails on invalid json template literal, without schema', async () => {
    expect(async () => await json(undefined)`rubbish`).toThrow();
  });
});

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
    await expect(json(undefined)('rubbish')).rejects.toThrow();
  });

  it('accepts plain object, without schema', async () => {
    const actual = json(undefined)(jsonObj);
    expect(await actual).toBe(formatted);
  });

  it('accepts tagged template literals, without schema', async () => {
    const template = await json(undefined)`{ "test": "value" }`;
    const generate = template.generate({
      filePath: [],
    });
    expect(await generate).toBe(formatted);
  });

  it('fails on invalid json template literal, without schema', async () => {
    const template = await json(undefined)`rubbish`;
    const generate = template.generate({
      filePath: [],
    });
    await expect(generate).rejects.toThrow();
  });
});

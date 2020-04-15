const tag = async (
  value: TemplateStringsArray,
  ...placeholders: Promise<string>[]
) => {
  let result = '';

  // wait for all the placeholder dependencies to resolve
  const placeholderValues = await Promise.all(placeholders);

  // interleave the literals with the placeholders
  for (let i = 0; i < placeholders.length; i++) {
    result += value[i];
    result += placeholderValues[i];
  }

  // add the last literal (empty string if there is a final literal value)
  result += value[value.length - 1];

  return result;
};

describe('tagged template literals', () => {
  it.only('can also operate async', async () => {
    const _foo = (async () => await 'foo')();
    const _bar = (async () => await 'bar')();
    const _testBar = tag`test${_bar}`;
    const _fooBar = tag`test${_foo}: ${_testBar}`;

    console.log(await _fooBar);

    expect(await _fooBar).toBe(`testfoo: testbar`);
  });
});

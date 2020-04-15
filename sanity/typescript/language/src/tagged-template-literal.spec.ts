describe('tagged template literals', () => {
  it.only('can also operate async', async () => {
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

    const _ = (value: string) => (async () => await value)();

    const _foo = _('foo');
    const _bar = _('bar');
    const _testFoo = tag`test${_foo}`;
    const _testBar = tag`test${_bar}`;
    const _fooBar = tag`${_testFoo}:${_testBar} ${_foo}${_bar}`;

    const fooBar = await _fooBar;

    console.log(fooBar);
    expect(fooBar).toBe(`testfoo:testbar foobar`);
  });
});

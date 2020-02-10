describe('function', () => {
  it('can constrain to function', () => {
    const func: Func = () => '';
    const nonFunc: Exclude<any, Func> = () => '';
    console.log(nonFunc);
  });
});

describe('function', () => {
  it('can constrain to function', () => {
    const func: Function = () => '';
    const nonFunc: Exclude<any, Function> = () => '';
    console.log(nonFunc);
  });
});

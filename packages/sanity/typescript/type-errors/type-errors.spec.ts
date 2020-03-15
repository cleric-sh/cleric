describe('Typescript type errors', () => {
  it('Can use an abstract class as a Type error.', () => {
    abstract class TypeError<T extends string> {}

    type Test<T> = T extends string ? true : TypeError<'This should never happen'>;

    type MyType = Test<number>;
  });
});

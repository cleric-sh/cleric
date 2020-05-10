describe('classes', () => {
  it('can override and call base functions', () => {
    class Bar {
      myFunc() {
        return 'Bar';
      }
    }

    class Foo extends Bar {
      myFunc() {
        return 'Foo' + super.myFunc();
      }
    }

    const actual = new Foo().myFunc();

    expect(actual).toStrictEqual('FooBar');
  });
});

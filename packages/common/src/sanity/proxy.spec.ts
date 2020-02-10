describe('proxy', () => {
  it('blah', () => {
    interface IState<T extends IState<T>> {
      thing: boolean;
    }

    interface IBlah extends IState<IBlah> {}
  });

  it('proxies internal member calls also', () => {
    class TestClassImpl {
      constructor() {}
      public get myFunc() {
        return this.mySecondFunc;
      }

      public get mySecondFunc() {
        return 42;
      }
    }
    class TestClass {
      public readonly impl: TestClassImpl;
      constructor() {
        this.impl = new TestClassImpl();
      }

      public get myFunc() {
        return this.impl.myFunc;
      }
    }
    const proxy = new Proxy(new TestClass(), {
      get: (target, key, receiver) => {
        console.log('proxied ', key);
        return Reflect.get(target, key, receiver);
      },
    });
    proxy.myFunc;
  });
});

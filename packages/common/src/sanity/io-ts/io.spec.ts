import * as t from 'io-ts';

describe('io-ts', () => {
  it.only('can navigate through type graph', () => {
    const ExactType = t.exact(
      t.type({
        bar: t.number,
      }),
    );

    const MyType = t.type({
      test: t.string,
      foo: t.number,
      x: ExactType,
    });

    const a: t.TypeOf<typeof MyType> = {
      foo: 1,
      test: 'test',
      x: {
        bar: 2,
      },
    };

    // MyType.props.;

    const d = MyType.decode({
      foo: 1,
      test: 'test',
      x: {
        bar: 2,
      },
    });
    console.log(d);

    const e = MyType.encode({
      foo: 1,
      test: 'test',
      x: {
        bar: 2,
      },
    });
    console.log(e);
  });
});

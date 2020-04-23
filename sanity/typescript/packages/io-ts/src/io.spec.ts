/* eslint-disable */

import {Pass, check, checks} from '@cleric/common';
import * as t from 'io-ts';

describe('io-ts', () => {
  it('can navigate through type graph', () => {
    const ExactType = t.exact(
      t.type({
        bar: t.number,
      })
    );

    const MyType = t.type({
      foo: t.number,
      test: t.string,
      x: ExactType,
    });

    const a: t.TypeOf<typeof MyType> = {
      foo: 1,
      test: 'test',
      x: {
        bar: 2,
      },
    };
    const subType = MyType.props.foo;

    checks([check<typeof subType, t.NumberC, Pass>()]);

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

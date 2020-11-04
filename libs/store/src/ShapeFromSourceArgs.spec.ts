import {ShapeFromSourceArgs} from './ShapeFromSourceArgs';
import {Source} from './store';

describe('ShapeFromSourceArgs', () => {
  it('returns the correct object inner type from SourceArgs', () => {
    type MySourceArgs = {
      blah: Source<boolean>;
      nested: {
        optional?: string;
        value: Source<number>;
      };
    };

    const shape: ShapeFromSourceArgs<MySourceArgs> = {
      blah: true,
      nested: {
        value: 1,
        // optional: 123,
      },
    };

    console.log(shape);
  });
});

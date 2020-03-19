import { Subject } from 'rxjs/internal/Subject';
import { listen } from './listen';

describe('listen', () => {
  it('listens for all values and returns them async', async () => {
    const subject = new Subject<number>();

    const _value = listen(subject);

    subject.next(1);
    subject.next(2);
    subject.next(3);

    subject.complete();

    expect(await _value).toEqual([1, 2, 3]);
  });
});

import {mapSourcesToProps} from './mapSourcesToProps';
import {
  Subject,
  BehaviorSubject,
  Observable,
  from,
  ObservableInput,
  isObservable,
} from 'rxjs';
import {toArray} from 'rxjs/operators';
import {SourceArgs, Shape, SourceArgsFromShape} from './store';
import {ShapeFromSourceArgs} from './ShapeFromSourceArgs';

describe('mapSourcesToProps', () => {
  it('should return an observable with all observables combined in shape', () => {
    const actual: Observable<{
      arr: number;
      obs: string;
      obj: {narf: number};
      // asy: string;
    }> = mapSourcesToProps({
      arr: [1],
      obs: from(['bar', 'dee', 'foo']),
      obj: {
        narf: [1],
      },
      // asy: async () => {
      //   console.log('running');
      //   await new Promise((resolve, reject) => () => {
      //     console.log('running');
      //     setTimeout(() => {
      //       console.log('off');
      //       resolve();
      //     }, 50);
      //   });
      //   console.log('ran');
      //   return 'foo';
      // },
    });
    actual.subscribe(({arr, obs, obj}) => console.log(arr, obs, obj));
    expect(isObservable(actual)).toBe(true);
  });

  it('should return same observable when observable provided as param', () => {
    const expected = from([1, 2, 3]);
    const actual: Observable<number> = mapSourcesToProps(expected);
    expect(isObservable(actual)).toBe(true);
    expect(actual).toBe(expected);
  });
});

type Test = {
  arr: number;
  obs: string;
  obj: {
    narf: number;
  };
};

const sources: SourceArgs = {
  arr: [3],
  obj: [],
  obs: from([123]),
};

function sourceToSpec<TSources extends SourceArgs>(
  sources: TSources
): ShapeFromSourceArgs<TSources> {
  return null as any;
}

function specToSources<TSpec extends Shape>(
  sources: SourceArgsFromShape<TSpec>
): SourceArgsFromShape<TSpec> {
  return null as any;
}

const specFromSources = sourceToSpec({
  arr: [3],
  obj: {
    narf: ['string'],
  },
  obs: from([123]),
});

type MySpec = {
  arr: number;
  obj: {
    narf: string;
  };
  obs: number;
};

const sourcesFromSpec = specToSources<typeof specFromSources>({
  // const sourcesFromSpec = specToSources<MySpec>({
  arr: [1],
  obs: from([1]),
  // obj: from([{ narf: [''] }]),
  obj: {
    narf: [''],
  },
});

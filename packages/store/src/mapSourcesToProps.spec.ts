import { mapSourcesToProps } from './mapSourcesToProps';
import { Subject, BehaviorSubject, Observable, from, ObservableInput } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { Sources, ShapeFromSources, Shape, SourcesFromShape } from './store';

describe('mapSourcesToProps', () => {
  it('should return an observable with all observables combined in shape', () => {
    const sourceProps = mapSourcesToProps({
      arr: [1],
      obs: from(['bar', 'dee', 'foo']),
      obj: {
        narf: [1],
      },
    });
    sourceProps.subscribe(({ arr, obs, obj }) => console.log(arr, obs, obj));
  });

  it('should return observable when observable provided as param', () => {
    const sourceProps = mapSourcesToProps(from([1, 2, 3]));
  });
});

type Test = {
  arr: number;
  obs: string;
  obj: {
    narf: number;
  };
};

const sources: Sources = {
  arr: [3],
  obj: [],
  obs: from([123]),
};

function sourceToSpec<TSources extends Sources>(sources: TSources): ShapeFromSources<TSources> {
  return null as any;
}

function specToSources<TSpec extends Shape>(
  sources: SourcesFromShape<TSpec>,
): SourcesFromShape<TSpec> {
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

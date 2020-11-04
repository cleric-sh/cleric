import {
  ShapeFromSourceArgs,
  SourceArgs,
  mapSourcesToProps,
} from '@cleric/store';
import {useEffect, useState} from 'react';

export function useSources<TSources extends SourceArgs>(sources: TSources) {
  const props$ = mapSourcesToProps(sources);

  const [state, setState] = useState<ShapeFromSourceArgs<TSources>>(
    undefined as any
  );

  useEffect(() => {
    const subscription = props$.subscribe(setState);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return state;
}

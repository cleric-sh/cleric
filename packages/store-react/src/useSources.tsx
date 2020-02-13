import { useState, useEffect } from 'react';
import { SourceArgs, ShapeFromSourceArgs, mapSourcesToProps } from '@cleric/store';

export function useSources<TSources extends SourceArgs>(sources: TSources) {
  const props$ = mapSourcesToProps(sources);

  const [state, setState] = useState<ShapeFromSourceArgs<TSources>>(undefined);

  useEffect(() => {
    const subscription = props$.subscribe(setState);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return state;
}

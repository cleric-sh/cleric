import * as t from 'io-ts';
import {Observable} from 'rxjs';

export type Slice$Selector<P extends t.Any, T extends t.Any> = (
  parent: Observable<t.TypeOf<P>>
) => Observable<t.TypeOf<T>>;

import {Pass, check, checks} from '@cleric/common';
import {Extends} from 'Any/_api';
import {Observable} from 'rxjs';
import {ReducerObservables} from './ReducerObservables';

describe('ReducerObservables', () => {
  it('should create type with same shape as base type', () => {
    type allowed = ReducerObservables<{one: string}>;

    type arg = Observable<{one: string}>;
    type arg2 = {one: Observable<string>};

    checks([check<Extends<arg, allowed>, 1, Pass>()]);
    checks([check<Extends<arg2, allowed>, 1, Pass>()]);
  });
});

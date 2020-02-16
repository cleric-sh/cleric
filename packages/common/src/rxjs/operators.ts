import { Observable, MonoTypeOperatorFunction } from 'rxjs';
import { scan, mergeMap, first } from 'rxjs/operators';

/**
 * Inverts a boolean signal every time the specified event is received.
 * @param event
 */
export const toggle = (event: Observable<any>): MonoTypeOperatorFunction<boolean> => $ =>
  $.pipe(
    first(),
    mergeMap(initial => event.pipe(scan(last => !last, initial))),
  );

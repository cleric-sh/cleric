import { Observable, MonoTypeOperatorFunction } from 'rxjs';
import { withLatestFrom, scan } from 'rxjs/operators';

/**
 * Inverts a boolean signal every time the specified event is received.
 * @param event
 */
export const toggle = (event: Observable<any>): MonoTypeOperatorFunction<boolean> => $ =>
  $.pipe(
    withLatestFrom(event),
    scan((_, [last]) => !last, false),
  );

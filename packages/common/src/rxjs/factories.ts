import { Observable, merge } from 'rxjs';

import { mapTo } from 'rxjs/operators';

/**
 * Combines separate 'on' and 'off' event streams into a boolean signal depicting on or off.
 * Duplicate events are ignored.
 * @param on
 * @param off
 */
export const onOff = (on: Observable<any>, off: Observable<any>): Observable<boolean> =>
  merge(on.pipe(mapTo(true)), off.pipe(mapTo(false)));

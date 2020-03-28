import {from, ObservableInput} from 'rxjs';
import {toArray} from 'rxjs/internal/operators/toArray';

/**
 * Listens to the observable stream '$' until it is completed, and returns a
 * promise for an array of all the elements received.
 *
 * This makes testing observables in async functions a bit more semantic.
 *
 * @param $: An input that is interpretable as an observable stream.
 */
export const listen = <T>($: ObservableInput<T>) =>
    from($).pipe(toArray()).toPromise();

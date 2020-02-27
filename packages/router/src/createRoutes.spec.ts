import { createRoutes } from './createRoutes';

import { route } from './route';
import * as t from 'io-ts';

describe('createRoutes', () => {
  it('should', () => {
    const MyParams = {
      blah: t.string,
    };

    const routes$ = createRoutes({
      LOGIN: route(MyParams)('/login', {
        REGISTER: route()('/register', {
          SUBMITTED: route({ id: t.string })('/submitted'),
          CANCELLED: route()('/cancelled'),
        }),
      }),
    });

    // TODO: Next, refactor store, so that the observable proxy wrapper is a separate base function.
    // Use the same wrapper as a read-only accessor for the route.
    // Route shouldn't be combined with the same state object. Or should it?

    // Add support for batched mutations, using a facade of the store, which collects an array of mutation payloads.
    // Allow the store to process all the mutations at once, and emit a single update.
    // This will have benefits in being more granular, and not requiring the entire tree's hash to be recalculated.
    // Then, remove monolite from router, express the router as a Store of the initial value, and map router5's updates
    // to a batched mutation, that resets the old route and enables the new one.

    // routes({}).LOGIN.REGISTER;
    // routes({}).LOGIN.REGISTER.SUBMITTED.params;
  });
});

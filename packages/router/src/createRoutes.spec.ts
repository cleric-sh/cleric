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

    // routes({}).LOGIN.REGISTER;
    // routes({}).LOGIN.REGISTER.SUBMITTED.params;
  });
});

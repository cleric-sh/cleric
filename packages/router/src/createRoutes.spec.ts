import { createRoutes } from './createRoutes';

import { route } from './route';
import * as t from 'io-ts';

describe('createRoutes', () => {
  it('should', () => {
    const MyParams = {
      blah: t.string,
    };

    const routes = createRoutes({
      LOGIN: route(MyParams)('/login', {
        REGISTER: route()('/register', {
          SUBMITTED: route({ id: t.string })('/submitted'),
          CANCELLED: route()('/cancelled'),
        }),
      }),
    });

    routes.LOGIN.activated.$;
    routes.LOGIN.REGISTER.$;
    routes.LOGIN.REGISTER.SUBMITTED.params.$;

    // Then, remove monolite from router, express the router as a Store of the initial value, and map router5's updates
    // to a batched mutation, that resets the old route and enables the new one.

    // routes({}).LOGIN.REGISTER;
    // routes({}).LOGIN.REGISTER.SUBMITTED.params;
  });
});

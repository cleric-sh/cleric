import { createRoutes } from './createRoutes';

import { route, routes, RoutesArgs, RouteArgs } from './route';
import * as t from 'io-ts';
import { RoutesState } from '.';

describe('createRoutes', () => {
  it('should', () => {
    const MyParams = {
      blah: t.string,
    };

    const children = routes({
      SUBMITTED: route({
        path: '/submitted',
        type: { id: t.number },
      }),
      CANCELLED: route({ path: '/cancelled' }),
    });

    const spec = routes({
      LOGIN: route({
        path: '/login',
        type: MyParams,
        children: routes({
          REGISTER: route({
            path: '/register',
            type: { ask: t.string },
            children,
          }),
        }),
      }),
      SECOND: route({
        path: '/second',
        // type: { foo: t.number },
        children: {
          OW: route({ path: '/foo', type: { grr: t.string } }),
        },
      }),
    });

    const s: RoutesState<typeof spec> = {} as any;

    s.LOGIN.name;
    s.LOGIN.path;
    s.LOGIN.params;
    s.LOGIN.params.blah;
    s.LOGIN.REGISTER.name;
    s.LOGIN.REGISTER.path;
    s.LOGIN.REGISTER.params;
    s.LOGIN.REGISTER.params.blah;
    s.LOGIN.REGISTER.params.ask;
    s.LOGIN.REGISTER.params.foo;
    s.LOGIN.REGISTER.SUBMITTED.name;
    s.LOGIN.REGISTER.SUBMITTED.path;
    s.LOGIN.REGISTER.SUBMITTED.params.blah;
    s.LOGIN.REGISTER.SUBMITTED.params.id;
    s.LOGIN.REGISTER.SUBMITTED.params.ask;
    s.LOGIN.REGISTER.SUBMITTED.params.id;
    s.LOGIN.REGISTER.SUBMITTED.params.sdfjsk;
    // s.LOGIN.REGISTER.CANCELLED.params.rubbish;
    s.SECOND.params;
    s.SECOND.OW.params.grr;
    s.SECOND.OW.params.grr;
    s.SECOND.OW.params.asdsdf;

    const rs = createRoutes(spec);

    // const c: RouteState<typeof spec> = {} as any;
    // c.LOGIN.REGISTER.params.blah;
    // c.LOGIN.REGISTER.params.ask;
    // c.LOGIN.REGISTER.SUBMITTED.params.blah;
    // c.LOGIN.REGISTER.SUBMITTED.params.ask;
    // c.SECOND.OW.params.foo;

    rs.LOGIN.params.blah;
    rs.LOGIN.REGISTER.params.ask;
    rs.LOGIN.REGISTER.params.blah;
    rs.LOGIN.REGISTER.SUBMITTED.params.id;
    rs.LOGIN.REGISTER.SUBMITTED.params.blah;
    rs.LOGIN.REGISTER.SUBMITTED.params.ask;
    rs.LOGIN.REGISTER.CANCELLED.params;
    rs.SECOND.OW.params.grr.$;

    // routes.SECOND.OW.params.grr;
    // routes.SECOND.OW.params.foo;

    // routes({}).LOGIN.REGISTER;
    // routes({}).LOGIN.REGISTER.SUBMITTED.params;
  });
});

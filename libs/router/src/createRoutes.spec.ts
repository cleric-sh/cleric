import {createRoutes} from './createRoutes';

import * as t from 'io-ts';
import {RoutesState} from '.';
import {route, routes} from './route';

describe('createRoutes', () => {
  it('should', () => {
    const MyParams = {
      blah: t.string,
    };

    const children = routes({
      CANCELLED: route({path: '/cancelled'}),
      SUBMITTED: route({
        path: '/submitted',
        type: {id: t.number},
      }),
    });

    const spec = routes({
      LOGIN: route({
        children: routes({
          REGISTER: route({
            children,
            path: '/register',
            type: {ask: t.string},
          }),
        }),
        path: '/login',
        type: MyParams,
      }),
      SECOND: route({
        // type: { foo: t.number },
        children: {
          OW: route({path: '/foo', type: {grr: t.string}}),
        },
        path: '/second',
      }),
    });

    const s: RoutesState<typeof spec> = {
      LOGIN: {
        REGISTER: {
          CANCELLED: {
            name: 'LOGIN.REGISTER.CANCELLED',
            params: {
              ask: 'ask',
              blah: 'blah',
            },
            path: '/login/register/cancelled',
          },
          SUBMITTED: {
            name: 'LOGIN.REGISTER.SUBMITTED',
            params: {
              ask: 'ask',
              blah: 'blah',
              id: 1,
            },
            path: '/login/register/submitted',
          },
          name: 'LOGIN.REGISTER',
          params: {
            ask: 'ask',
            blah: 'blah',
          },
          path: '/login/register',
        },
        name: 'LOGIN',
        params: {
          blah: 'blah',
        },
        path: '/login',
      },
      SECOND: {
        OW: {
          name: 'SECOND.OW',
          params: {
            grr: 'grr',
          },
          path: '/second/ow',
        },
        name: 'SECOND',
        path: '/second',
      },
    };

    s.LOGIN.name;
    s.LOGIN.path;
    s.LOGIN.params;
    s.LOGIN.params.blah;
    s.LOGIN.REGISTER.name;
    s.LOGIN.REGISTER.path;
    s.LOGIN.REGISTER.params;
    s.LOGIN.REGISTER.params.blah;
    s.LOGIN.REGISTER.params.ask;
    // s.LOGIN.REGISTER.params.foo;
    s.LOGIN.REGISTER.SUBMITTED.name;
    s.LOGIN.REGISTER.SUBMITTED.path;
    s.LOGIN.REGISTER.SUBMITTED.params.blah;
    s.LOGIN.REGISTER.SUBMITTED.params.id;
    s.LOGIN.REGISTER.SUBMITTED.params.ask;
    s.LOGIN.REGISTER.SUBMITTED.params.id;
    // s.LOGIN.REGISTER.SUBMITTED.params.sdfjsk;
    // s.LOGIN.REGISTER.CANCELLED.params.rubbish;
    // s.SECOND.params;
    s.SECOND.OW.params.grr;
    s.SECOND.OW.params.grr;
    // s.SECOND.OW.params.asdsdf;

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

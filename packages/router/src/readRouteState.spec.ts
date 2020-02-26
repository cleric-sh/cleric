import { route, Routes } from '.';
import { readRouteState } from './readRouteState';
import { SubscribeState } from 'router5';
import * as t from 'io-ts';

describe('readRouteState', () => {
  it('should', () => {
    const routeMap = {
      TEST: route()('/test', {
        NESTED: route({ id: t.number })('/nested'),
      }),
      SECOND: route()('/second'),
    };
    const initial: Routes<typeof routeMap> = {
      TEST: {
        activated: false,
        NESTED: {
          activated: false,
        },
      },
      SECOND: {
        activated: false,
      },
    };
    const state: SubscribeState = {
      route: {
        name: 'TEST.NESTED',
        params: {
          id: 4,
          anotherValue: 'blah',
        },
        path: '/test/nested',
      },
    } as any;
    const routeState = readRouteState(routeMap, initial, state);
    expect(routeState).not.toBe(initial);
    expect(routeState).toEqual({
      TEST: {
        activated: true,
        NESTED: {
          activated: true,
          params: { id: 4 },
        },
      },
      SECOND: {
        activated: false,
      },
    });
  });
});

import { route } from './route';
import { readRouteState } from './readRouteState';
import { SubscribeState } from 'router5';
import * as t from 'io-ts';
import { RouteMap } from '.';

describe('readRouteState', () => {
  it('should', () => {
    const routeMap = {
      TEST: {
        path: '/test',
        codec: t.exact(t.type({ anotherValue: t.string })),
        children: {
          NESTED: { path: '/nested', codec: t.exact(t.type({ id: t.number })) },
        },
      },
      SECOND: { path: '/second', type: t.exact(t.type({ tag: t.string })) },
    };

    const state: SubscribeState = {
      previousRoute: {
        name: 'SECOND',
        path: '/second',
        params: { tag: 'foo' },
      },
      route: {
        name: 'TEST.NESTED',
        params: {
          id: 4,
          anotherValue: 'blah',
          ignoreThisValue: 123,
        },
        path: '/test/nested',
      },
    } as any;

    // const [mutations, mutator] = createMutator<typeof initial>();

    const expected = readRouteState(routeMap as any, state);

    expect(expected).toEqual({
      TEST: {
        NESTED: {
          name: 'TEST.NESTED',
          params: { anotherValue: 'blah', id: 4 },
          path: '/test/nested',
          state,
        },
        name: 'TEST',
        params: { anotherValue: 'blah' },
        path: '/test',
        state,
      },
    });
  });
});

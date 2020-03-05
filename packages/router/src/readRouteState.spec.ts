import { route } from './route';
import { readRouteState } from './readRouteState';
import { SubscribeState } from 'router5';
import * as t from 'io-ts';

describe('readRouteState', () => {
  it('should', () => {
    const routeMap = {
      TEST: route({
        path: '/test',
        type: { anotherValue: t.string },
        children: {
          NESTED: route({ path: '/nested', type: { id: t.number } }),
        },
      }),
      SECOND: route({ path: '/second', type: { tag: t.string } }),
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

    const expected = readRouteState(routeMap, state);

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

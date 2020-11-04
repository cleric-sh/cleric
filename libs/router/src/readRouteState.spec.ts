import * as t from 'io-ts';
import {SubscribeState} from 'router5';
import {RouteMap} from '.';
import {readRouteState} from './readRouteState';
import {route} from './route';

describe('readRouteState', () => {
  it('should', () => {
    const routeMap = {
      SECOND: {path: '/second', type: t.exact(t.type({tag: t.string}))},
      TEST: {
        children: {
          NESTED: {codec: t.exact(t.type({id: t.number})), path: '/nested'},
        },
        codec: t.exact(t.type({anotherValue: t.string})),
        path: '/test',
      },
    };

    const state: SubscribeState = {
      previousRoute: {
        name: 'SECOND',
        path: '/second',
        params: {tag: 'foo'},
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
          params: {anotherValue: 'blah', id: 4},
          path: '/test/nested',
          state,
        },
        name: 'TEST',
        params: {anotherValue: 'blah'},
        path: '/test',
        state,
      },
    });
  });
});

import { Routes } from '.';
import { route } from './route';
import { readRouteState } from './readRouteState';
import { SubscribeState } from 'router5';
import * as t from 'io-ts';
import { createMutator } from '@cleric/store/src/createMutator';

describe('readRouteState', () => {
  it('should', () => {
    const routeMap = {
      TEST: route({ anotherValue: t.string })('/test', {
        NESTED: route({ id: t.number })('/nested'),
      }),
      SECOND: route({ tag: t.string })('/second'),
    };
    const initial: Routes<typeof routeMap> = {
      TEST: {
        activated: false,
        NESTED: {
          activated: false,
        },
      },
      SECOND: {
        activated: true,
        params: { tag: 'foo' },
      },
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

    const [mutations, mutator] = createMutator<typeof initial>();

    readRouteState(routeMap, mutator, state);

    expect(mutations).toEqual([
      { path: ['SECOND', 'params'], state: undefined, type: 'DELETE' },
      { path: ['SECOND', 'activated'], state: false, type: 'SET' },
      { path: ['TEST', 'params'], state: { anotherValue: 'blah' }, type: 'SET' },
      { path: ['TEST', 'activated'], state: true, type: 'SET' },
      { path: ['TEST', 'NESTED', 'params'], state: { id: 4 }, type: 'SET' },
      { path: ['TEST', 'NESTED', 'activated'], state: true, type: 'SET' },
    ]);
  });
});

import { convertRouteMapToInitialState } from './convertRouteMapToInitialState';
import { route, Routes } from '.';

describe('convertRouteMapToInitialState', () => {
  it('should', () => {
    const routeMap = {
      TEST: route()('/test', {
        NESTED: route()('/nested'),
      }),
      SECOND: route()('/second'),
    };
    const actual = convertRouteMapToInitialState(routeMap);
    const expected: Routes<typeof routeMap> = {
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
    expect(actual).toEqual(expected);
  });
});

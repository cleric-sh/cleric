import {convertRouteMapToRoutes} from './convertRouteMapToRoutes';
import {route, RoutesArgs} from './route';
import {Route} from 'router5';

describe('convertRouteMapToRoutes', () => {
  it('should create a Route node for each property', () => {
    const routeMap: RoutesArgs = {
      TEST: route({
        path: '/test',
        children: {
          NESTED: route({
            path: '/nested',
          }),
        },
      }),
      SECOND: route({path: '/second'}),
    };
    const actual = convertRouteMapToRoutes(routeMap);
    const expected: Route[] = [
      {
        name: 'TEST',
        path: '/test',
        children: [
          {
            name: 'NESTED',
            path: '/nested',
          },
        ],
      },
      {
        name: 'SECOND',
        path: '/second',
      },
    ];
    expect(actual).toEqual(expected);
  });
});

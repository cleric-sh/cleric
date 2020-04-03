import {Route} from 'router5';
import {convertRouteMapToRoutes} from './convertRouteMapToRoutes';
import {RoutesArgs, route} from './route';

describe('convertRouteMapToRoutes', () => {
  it('should create a Route node for each property', () => {
    const routeMap: RoutesArgs = {
      SECOND: route({path: '/second'}),
      TEST: route({
        children: {
          NESTED: route({
            path: '/nested',
          }),
        },
        path: '/test',
      }),
    };
    const actual = convertRouteMapToRoutes(routeMap);
    const expected: Route[] = [
      {
        children: [
          {
            name: 'NESTED',
            path: '/nested',
          },
        ],
        name: 'TEST',
        path: '/test',
      },
      {
        name: 'SECOND',
        path: '/second',
      },
    ];
    expect(actual).toEqual(expected);
  });
});

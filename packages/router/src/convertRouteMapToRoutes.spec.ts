import { convertRouteMapToRoutes } from './convertRouteMapToRoutes';
import { IRouteMap } from '.';
import { route } from './route';
import { Route } from 'router5';

describe('convertRouteMapToRoutes', () => {
  it('should create a Route node for each property', () => {
    const routeMap: IRouteMap = {
      TEST: route()('/test', {
        NESTED: route()('/nested'),
      }),
      SECOND: route()('/second'),
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

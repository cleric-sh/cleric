import {connect} from '@cleric/store-react';
import {Slice} from '@cleric/store/src/store';
import React from 'react';

type RouteProps = {route: Slice<any>};

export const Route: React.SFC<RouteProps> = ({children, route}) => {
  const RouteNode = connect({route})(({route}) => <>{route && children}</>);
  return <RouteNode />;
};

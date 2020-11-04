import React from 'react';

import {connect} from '@cleric/store-react';
import {Slice} from '@cleric/store/src/store';

type RouteProps = {route: Slice<any>};

export const Route: React.SFC<RouteProps> = ({children, route}) => {
  const RouteNode = connect({route})(({route}) => <>{route && children}</>);
  return <RouteNode />;
};

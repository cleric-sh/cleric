import React from 'react';
import { Slice } from '@cleric/store/src/store';
import { connect } from '@cleric/store-react';

type RouteProps = {
  route: Slice<any>;
};

export const Route: React.SFC<RouteProps> = ({ route, children }) => {
  const RouteNode = connect({ route })(({ route }) => <>{route && children}</>);
  return <RouteNode />;
};

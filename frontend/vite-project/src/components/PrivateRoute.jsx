import React from 'react';
import { Navigate } from 'react-router-dom';

import useStore from '../store';

const PrivateRoute = ({ component: Component }) => {
  const { user } = useStore();
  const isAuthenticated = !!user.token
  // const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Component /> : <Navigate to="/unauthenticated" from={true}/>;
};

export default PrivateRoute;

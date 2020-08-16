import React, { ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

interface PrivateRouteProps {
  children: ReactNode;
  path: string;
  exact: true;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
  const { isAuthenticated, user } = useAuth0();

  const isUser = isAuthenticated && user;

  return (
    <Route
      {...rest}
      render={() => {
        return isUser ? children : <Redirect to='/login' />;
      }}></Route>
  );
};
export default PrivateRoute;

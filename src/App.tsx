import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <AuthWrapper>
      <Router>
        <Switch>
          <PrivateRoute path='/' exact>
            <Dashboard />
          </PrivateRoute>
          <Route path='/Login' component={Login} />
          <Route path='*' component={Error} />
        </Switch>
      </Router>
    </AuthWrapper>
  );
};
export default App;

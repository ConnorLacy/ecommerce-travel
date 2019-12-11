import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from './components/Admin';
import Login from './components/Login'
import Customer from './components/Customer';

export const Routes = () => (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/admin' component={Admin} />
      <Route path='/index' component={Customer} />
    </Switch>
);
export default Routes
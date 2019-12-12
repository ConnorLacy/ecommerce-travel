import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from './components/Admin';
import Login from './components/Login'
import App from './components/App';
import ShoppingCart from './components/ShoppingCart';

export const Routes = () => (
    <Switch>
      <Route exact path='/' component={App}/>
      <Route path='/cart' component={ShoppingCart}/>        
      <Route path='/login' component={Login}/>
      <Route path='/admin' component={Admin} />
    </Switch>
);
export default Routes
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import OrphangesMap from './pages/OrphangesMap';


const Routes: React.FC<{}> = () => {
  return (<BrowserRouter>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/app' component={OrphangesMap} />
    </Switch>
  </BrowserRouter>)
}

export default Routes;
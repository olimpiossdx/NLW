import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import OrphangesMap from './pages/OrphangesMap';
import Orphange from './pages/Orphanage';
import CreateOrphange from './pages/CreateOrphanage';


const Routes: React.FC<{}> = () => {
  return (<BrowserRouter>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/app' component={OrphangesMap} />
      <Route path='/orphanges/create' component={CreateOrphange} />
      <Route path='/orphanges/:id' component={Orphange} />
    </Switch>
  </BrowserRouter>)
}

export default Routes;
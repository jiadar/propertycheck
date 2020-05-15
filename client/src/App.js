import React from 'react';
import Dashboard from './pages/Dashboard/';
import Inspections from './pages/Inspections/';
import Inspection from './pages/Inspection/';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => (
  <div>
    <Router>
      <Switch>
        <Route path="/property/:id/inspections">
          <Inspections />
        </Route>
        <Route path="/inspection/:id">
          <Inspection />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  </div>
);


export default App;

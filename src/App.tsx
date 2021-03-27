import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import EditPage from './pages/EditPage';

import HomePage from './pages/HomePage';
import PlayPage from './pages/PlayPage';

export default function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/play">
            <PlayPage />
          </Route>
          <Route path="/edit">
            <EditPage />
          </Route>
        </Switch>
    </Router>
  );
}

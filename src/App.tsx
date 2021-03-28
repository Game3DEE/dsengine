import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import AdminPage from './pages/AdminPage';
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
          <Route path="/admin">
            <AdminPage />
          </Route>
        </Switch>
    </Router>
  );
}

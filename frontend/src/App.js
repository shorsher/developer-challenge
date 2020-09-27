import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/header/Header'

import Home from './pages/Home';
import Registration from './pages/Registration';
import Vote from './pages/Vote';
import ElectionSearch from './components/search/ElectionSearch';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/register">
          <Registration />
        </Route>
        <Route exact path="/vote/:address">
          <Vote />
        </Route>
        <Route exact path="/vote">
          <ElectionSearch />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

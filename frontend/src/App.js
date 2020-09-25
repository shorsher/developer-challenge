import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/header/Header'

import Home from './pages/Home';
import Registration from './pages/Registration';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/register">
          <Registration />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

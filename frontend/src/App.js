import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Route path="/">
        <Home />
      </Route>
    </BrowserRouter>
  );
}

export default App;

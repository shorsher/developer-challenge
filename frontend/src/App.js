import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import Header from './components/header/Header'
import Home from './pages/Home';
import Registration from './pages/Registration';
import Vote from './pages/Vote';
import Results from './pages/Results';
import ElectionSearch from './components/search/ElectionSearch';
import ResultSearch from './components/search/ResultSearch';

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
        <Route exact path="/results/:address">
          <Results />
        </Route>
        <Route exact path="/results">
          <ResultSearch />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

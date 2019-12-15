import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//pages
import HomePage from './pages/Home'
import OverviewPage from './pages/Overview'


function App() {
  return (
    <Router>
      <Route path="/" component={ HomePage } exact></Route>
      <Route path="/overview" component={ OverviewPage }></Route>
    </Router>
  );
}

export default App;
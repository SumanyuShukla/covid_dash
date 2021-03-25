import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import India from './components/india';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={India}/>
          <Route path="/global" exact component={Home}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;

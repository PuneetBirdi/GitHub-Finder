import React from 'react';
import NavBar from './components/layout/NavBar';
import User from './components/users/User';
import Alert from './components/layout/alert';
import About from './components/pages/About';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

const App = () => {
  return(
  <AlertState>
    <GithubState>
      <Router>
        <div className="App">
          <NavBar/>
          <div className="container">
            <Alert/>
            <Switch>
              <Route exact path='/' component = {Home}/>
              <Route exact path ='/about' component={About}></Route>
              <Route exact path ='/user/:login' component={User}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  </AlertState>
  )
}

export default App;

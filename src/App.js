import React, { Component, Fragment } from 'react';
import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/search'
import Alert from './components/layout/alert';
import About from './components/pages/About';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  }
  // async componentDidMount(){
  //   this.setState({loading:true});
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({users: res.data, loading:false});
  // }

  searchUsers = async (text) =>{
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users: res.data.items, loading:false});
  }

  //Get a single Github User

  getUser = async (username) =>{
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({user: res.data, loading:false});
  }

  //Get users repos

  getUserRepos = async (username) =>{
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({repos: res.data, loading:false});
  }

  //Clear Users from State
  clearUsers = () =>{
    this.setState({users: [], loading: false});
  }

  //Set Alert
  setAlert = (msg, type) =>{
    this.setState({alert: {msg: msg, type: type,}});
    setTimeout(()=>this.setState({alert:null}), 5000);
  }

  render(){
    const {user, users, loading, repos} = this.state;
    return(
    <Router>
      <div className="App">
        <NavBar/>
        <div className="container">
          <Alert alert={this.state.alert}/>
          <Switch>
            <Route exact path='/' 
            render={props => (
              <Fragment>
                <Search 
                searchUsers={this.searchUsers} 
                clearUsers={this.clearUsers} 
                showClear={users.length >0 ? true : false} 
                setAlert={this.setAlert}
                />
                <Users loading={loading} users={users}/>
              </Fragment>
            )}/>
            <Route exact path ='/about' component={About}></Route>
            <Route exact path ='/user/:login' render={props => (
              <User 
              {...props} 
              getUser={this.getUser} 
              getUserRepos={this.getUserRepos}
              user={user}
              repos={repos}
              loading={loading}
              />
            )}/>
          </Switch>
        </div>
      </div>
    </Router>
    )
  }
}

export default App;

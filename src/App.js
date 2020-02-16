import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Edit from './components/manage/Edit.js';
import Login from './components/manage/Login';
import AdminPanel from './components/manage/AdminPanel';

import Trends from './components/statistics/Trends';

import About from './components/pages/About';

import * as actions from './store/actions/auth';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/manage" render={props => (
            <React.Fragment>
              <Header {...this.props}/>
              <AdminPanel {...this.props}/> 
              <Footer /> 
            </React.Fragment>
          )} />

          <Route exact path="/" component={About}></Route>

          <Route exact path="/login/" component={Login}></Route>

          <Route path="/manage/edit/:uid" render={props => (
            <React.Fragment>
              <Header {...this.props}/>
              <Edit key={"questionnaires"} {...props} {...this.props} />
              <Footer />
            </React.Fragment>
          )} />

          <Route path="/statistics" component={Trends} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

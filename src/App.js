import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import Header from './components/layout/Header';

import Edit from './components/manage/Edit.js';
import Login from './components/manage/Login';
import AdminPanel from './components/manage/AdminPanel';

import Trends from './components/statistics/Trends';
import ViewResponse from './components/responses/ViewResponse';
import About from './components/pages/About';
import Answer from './components/pages/Answer';
import NotFound from './components/pages/NotFound';

import AnswerPage from './components/answer/Questionnaire';
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
        <div style={{fontFamily: ' -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
          <Switch>
            <Route exact path="/manage" render={props => (
              <React.Fragment>
                <Header {...this.props}/>
                <AdminPanel {...this.props}/> 
                
              </React.Fragment>
            )} />

            <Route exact path="/">
              <React.Fragment>
                <Header {...this.props}/>
                <About/>
              </React.Fragment>
            </Route>

            <Route exact path="/login/" component={Login}></Route>

            <Route path="/manage/edit/:uid" render={props => (
              <React.Fragment>
                <Header {...this.props}/>
                <Edit key={"questionnaires"} {...props} {...this.props} />
                
              </React.Fragment>
            )} />

            <Route path="/statistics" render={props => (
              <React.Fragment>
                <Header {...this.props}/>
                <Trends />
              </React.Fragment>
            )} />

            <Route path="/responses/:uid" render={props => (
              <React.Fragment>
                <Header {...this.props}/>
                <ViewResponse {...props} {...this.props}/>

              </React.Fragment>
            )} />

            <Route path="/answer/:uid" render={props => (
              <React.Fragment>
                <Header {...this.props}/>
                <AnswerPage {...props}/>
                
              </React.Fragment>
            )} />

            <Route exact path="/answerSearch" component={Answer} />

            <Route component={NotFound} />
          </Switch>
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

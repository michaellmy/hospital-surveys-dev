import React, { Component } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import axios from 'axios';
import uuid from 'uuid';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ListTitle from './components/layout/ListTitle';
import ListFooter from './components/layout/ListFooter';

import Questionnaires from './components/manage/Questionnaires';
import Edit from './components/manage/Edit.js';
import SearchBar from './components/manage/SearchBar';
import PageNumbers from './components/manage/PageNumbers';
import Login from './components/manage/Login';
import Signup from './components/manage/Signup';
import AdminPanel from './components/manage/AdminPanel';

import Trends from './components/statistics/Trends';

import About from './components/pages/About';
import Statistics from './components/pages/Statistics';

import * as actions from './store/actions/auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionnaires: [],
      currentPage: 1,
      questionnairesPerPage: 7,
      recentPage: 1,
      filteredQuestionnaires: []
    }
  }

  componentDidMount(){
    this.props.onTryAutoSignup();
    axios.get(window.location.origin + '/api/getAllQuestionnaires/')
      .then(res => this.setState({questionnaires: res.data, filteredQuestionnaires: res.data})); 
  }

  handlePageClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  delQuestionnaire = (id) => {
    axios({
      method: 'post',
      url: window.location.origin + '/api/deleteQuestionnaireByUid/' + id,
      headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
    });
    this.setState({ questionnaires: [...this.state.questionnaires.filter(questionnaire => questionnaire.uid !== id)] });
    this.setState({ filteredQuestionnaires: [...this.state.filteredQuestionnaires.filter(questionnaire => questionnaire.uid !== id)] }, () => { this.updatePage() });
  }

  addQuestionnaire = () => {
    const newQuestionnaire = {
      'uid': uuid.v4(),
      'title': 'New Questionnaire',
      'minAge': 10,
      'maxAge': 12,
      'description': '',
      'patientType': 'Inpatient',
      'questionnaireContent': []
    };
    
    var bodyFormData = new FormData();
    bodyFormData.append('1', JSON.stringify(newQuestionnaire));
    axios({
      method: 'post',
      url: window.location.origin + '/api/addQuestionnaire/',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
    });
    this.setState({ questionnaires: [...this.state.questionnaires, newQuestionnaire] });
    this.setState({ filteredQuestionnaires: [...this.state.filteredQuestionnaires, newQuestionnaire] }, () => { this.updatePage() });
  }

  filterSearch = (e) => {
    const filtered = this.state.questionnaires.filter(questionnaire => questionnaire.title.toLowerCase().includes(e.target.value.toLowerCase()));
    this.setState({ filteredQuestionnaires: filtered }, () => { this.setState({ currentPage: 1 }) });
  }

  updatePage = () => {
    const totalPages = Math.ceil((this.state.filteredQuestionnaires.length) / this.state.questionnairesPerPage);
    this.setState({ currentPage: totalPages })
  }

  refresh = () => {
    this.setState({ currentPage: 1 })
    this.setState({ filteredQuestionnaires: this.state.questionnaires })
  }

  render() {
    const { currentPage, questionnairesPerPage } = this.state;
    const indexOfLastTodo = currentPage * questionnairesPerPage;
    const indexOfFirstTodo = indexOfLastTodo - questionnairesPerPage;
    const currentQuestionnaires = this.state.filteredQuestionnaires.slice(indexOfFirstTodo, indexOfLastTodo);
 
    return (
      <Router>
        <div>
          <Route exact path="/manage" render={props => (
            <React.Fragment>
              <Header {...this.props}/>

              <AdminPanel currentQuestionnaires={currentQuestionnaires} indexOfFirstTodo={indexOfFirstTodo} 
               indexOfLastTodo={indexOfLastTodo} refresh={this.refresh} delQuestionnaire={this.delQuestionnaire}
               addQuestionnaire={this.addQuestionnaire} states={this.state} handlePageClick={this.handlePageClick}
               questionnaires={this.state.questionnaires} {...this.props}/> 

              <Footer /> 
            </React.Fragment>
          )} />

          <Route exact path="/" component={About}></Route>

          <Route exact path="/login/" component={Login}></Route>

          <Route exact path="/signup/" component={Signup}></Route>

          <Route path="/manage/edit/:uid" render={props => (
            <React.Fragment>
              <Header {...this.props}/>
              <Edit key={"questionnaires"} {...props} {...this.props} />
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

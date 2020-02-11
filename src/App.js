import React, { Component } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import axios from 'axios';
import uuid from 'uuid';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ListTitle from './components/layout/ListTitle';
import ListFooter from './components/layout/ListFooter';

import Questionnaires from './components/manage/Questionnaires';
import Edit from './components/manage/Edit.js';
import SearchBar from './components/manage/SearchBar';
import PageNumbers from './components/manage/PageNumbers';

import Trends from './components/statistics/Trends';

import About from './components/pages/About';
import Statistics from './components/pages/Statistics';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageHost: '',
      questionnaires: [],
      currentPage: 1,
      questionnairesPerPage: 7,
      recentPage: 1,
      filteredQuestionnaires: []
    }
  }

  componentDidMount(){
    this.setState({pageHost: window.location.origin});
    axios.get(this.state.pageHost + '/api/getAllQuestionnaires/')
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
      url: this.state.pageHost + '/api/deleteQuestionnaireByUid/' + id,
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
      url: this.state.pageHost + '/api/addQuestionnaire/',
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
        <div className="App">
          <Route exact path="/manage" render={props => (
            <React.Fragment>
              <Header />

              <Breadcrumb style={{marginTop: '1%'}}>
                  <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="#">
                    Dashboard
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>Manage Questionnaires</Breadcrumb.Item>
              </Breadcrumb>

              <div style={listStyle}>
                <SearchBar questionnaires={currentQuestionnaires} filterSearch={this.filterSearch} />
                <ListTitle refresh={this.refresh}></ListTitle>
                <Questionnaires questionnaires={currentQuestionnaires} delQuestionnaire={this.delQuestionnaire} />
                <ListFooter addQuestionnaire={this.addQuestionnaire} indexOfFirstTodo={indexOfFirstTodo} indexOfLastTodo={indexOfLastTodo} questionnaires={this.state.questionnaires}/>
                <PageNumbers states={this.state} handlePageClick={this.handlePageClick} />
                <br></br>&nbsp;
                <Statistics />
              </div>

              <Footer /> 
            </React.Fragment>
          )} />

          <Route exact path="/" component={About}></Route>

          <Route path="/manage/edit/:uid" render={props => (
            <React.Fragment>
              <Header />
              <Edit key={"questionnaires"} questionnaires={this.state.questionnaires} updateInfo={this.updateInfo} {...props} />
            </React.Fragment>
          )} />

          <Route path="/statistics" component={Trends} />
        </div>
      </Router>
    )
  }
}

const listStyle = {
  marginTop: '1%',
  marginLeft: '7%',
  marginRight: '7%',
}

export default App;

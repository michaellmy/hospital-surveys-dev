import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import { Breadcrumb, Jumbotron, Button, Spinner, Container} from 'react-bootstrap';

import ListTitle from '../layout/ListTitle';
import ListFooter from '../layout/ListFooter';

import SearchBar from '../manage/SearchBar';
import PageNumbers from '../manage/PageNumbers';
import Questionnaires from '../manage/Questionnaires';

import Statistics from '../pages/Statistics';


export class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaires: [],
            currentPage: 1,
            questionnairesPerPage: 7,
            recentPage: 1,
            filteredQuestionnaires: [], // Used for pagination and search
            isReady: false // Used for loading spinner
        }
    }

    componentDidMount(){
        axios.get(window.location.origin + '/api/getAllQuestionnaires/')
            .then(res => this.setState({questionnaires: res.data, filteredQuestionnaires: res.data}))
            .then(() => this.setState({isReady: true})); 
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

        if(this.state.isReady){
        return (
            <div>
                {
                    this.props.isAuthenticated ?

                    <div>
                        <Breadcrumb style={{ marginTop: '1%' }}>
                            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                            <Breadcrumb.Item active>Manage Questionnaires</Breadcrumb.Item>
                        </Breadcrumb>

                        <div style={listStyle}>
                            <SearchBar questionnaires={currentQuestionnaires} filterSearch={this.filterSearch}/>

                            <ListTitle refresh={this.refresh} />
                            <Questionnaires questionnaires={currentQuestionnaires} delQuestionnaire={this.delQuestionnaire}/>
                            <ListFooter addQuestionnaire={this.addQuestionnaire} indexOfFirstTodo={indexOfFirstTodo} 
                             indexOfLastTodo={indexOfLastTodo} questionnaires={this.state.questionnaires}/>
                             
                            <PageNumbers states={this.state} handlePageClick={this.handlePageClick} />
                            <br></br>&nbsp;
                            <Statistics />
                        </div>
                    </div>

                    :

                    <Jumbotron fluid>
                        <Container>
                            <h1 style={{color: '#000080'}}><b>Login to View and Manage Questionnaires</b></h1>
                            <p style={{color: '#52527a'}}>
                            You are seeing this page because you are either not logged in, or your session
                            has expired.
                            </p>
                            <p>
                                <Button href="/login/" variant="primary">Sign In</Button>&nbsp;&nbsp;
                                <Button href="/" variant="primary">Return to Home Page</Button>
                            </p>
                        </Container>
                    </Jumbotron>
                }
            </div>
        )
        } else {
            return <div style={{textAlign: "center", paddingTop: "10%"}}>
                <Spinner animation="border" variant="primary"/>
            </div>
        }
    }
}

const listStyle = {
    marginTop: '1%',
    marginLeft: '7%',
    marginRight: '7%',
}

export default AdminPanel

import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import { Breadcrumb, Jumbotron, Button, Spinner, Container, Alert} from 'react-bootstrap';

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
            questionnairesPerPage: 10,
            recentPage: 1,
            filteredQuestionnaires: [], // Used for pagination and search
            isReady: false, // Used for loading spinner
            errorMessage: null
        }
    }

    componentDidMount(){
        axios.get(window.location.origin + '/api/getAllQuestionnaires/')
            .then(res => this.setState({questionnaires: res.data, filteredQuestionnaires: res.data}))
            .then(() => this.setState({isReady: true})); 
    }

    changeErrorState = (message, variant) => {
        this.setState({errorMessage: 
            <div>
                <Alert variant={variant}>
                    <h5 style={{textAlign: 'center', paddingTop: '5px'}}>{message}</h5>
                </Alert>
            </div>})
    }

    handlePageClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    delQuestionnaire = (id) => {
        var self = this;
        axios({
            method: 'post',
            url: window.location.origin + '/api/deleteQuestionnaireByUid/' + id,
            headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                self.changeErrorState("Success - Questionnaire was deleted.", "info");
            })
            .catch(function (response) {
                self.changeErrorState("Failed to delete questionnaire - Could not connect to database", "danger");
        });
        this.setState({ questionnaires: [...this.state.questionnaires.filter(questionnaire => questionnaire.uid !== id)] });
        this.setState({ filteredQuestionnaires: [...this.state.filteredQuestionnaires.filter(questionnaire => questionnaire.uid !== id)] }, () => { this.updatePage() });
    }

    addQuestionnaire = () => {
        var self = this;
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
            self.changeErrorState("Success - Added new questionnaire.", "primary");
        })
        .catch(function (response) {
            self.changeErrorState("Failed to add new questionnaire - could not connect to database", "danger");
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

                    <div style={{marginLeft: '35px', marginRight: '35px', marginTop: '70px'}}>
                        {this.state.errorMessage}
                        <Breadcrumb>
                            <Breadcrumb.Item style={{color: '#3466cb'}} href="/">Home</Breadcrumb.Item>
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

                    <Jumbotron fluid style={{marginBottom: "20%"}}>
                        <Container>
                            <h1 style={{color: '#000080'}}>Login to View and Manage Questionnaires</h1>
                            <p style={{color: '#52527a'}}>
                            You are seeing this page because you are either not logged in, or your session
                            has expired.
                            </p>
                            <p>
                                <Button style={{backgroundColor: '#0080ff'}} href="/login/" variant="primary">Sign In</Button>&nbsp;&nbsp;
                                <Button style={{backgroundColor: '#0080ff'}} href="/" variant="primary">Return to Home Page</Button>
                            </p>
                        </Container>
                    </Jumbotron>
                }
            </div>
        )
        } else {
            return <div style={{textAlign: "center", paddingTop: "10%", marginBottom: "480px"}}>
                <Spinner animation="border" variant="primary">
                    <span className="sr-only">Loading...</span>
                </Spinner>
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

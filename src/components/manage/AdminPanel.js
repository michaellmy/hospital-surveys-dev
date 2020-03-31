import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import { Breadcrumb, Spinner} from 'react-bootstrap';
import { message } from 'antd';
import 'antd/dist/antd.css';

import ListTitle from '../layout/ListTitle';
import ListFooter from '../layout/ListFooter';
import Footer from '../layout/Footer';

import SearchBar from '../manage/SearchBar';
import PageNumbers from '../manage/PageNumbers';
import Questionnaires from '../manage/Questionnaires';

import Statistics from '../pages/Statistics';
import LoggedOut from '../pages/LoggedOut';


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
        var self = this;
        axios({
            method: 'post',
            url: window.location.origin + '/api/deleteQuestionnaireByUid/' + id,
            headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                message.success('Success - Questionnaire was deleted.')
                self.setState({ questionnaires: [...self.state.questionnaires.filter(questionnaire => questionnaire.uid !== id)] });
                self.setState({ filteredQuestionnaires: [...self.state.filteredQuestionnaires.filter(questionnaire => questionnaire.uid !== id)] }, () => { self.updatePage() });
            })
            .catch(function (response) {
                message.error('Failed to Delete Questionnaire - Could not connect to database')
        });
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
            message.success('Success - Added new questionnaire.')
            self.setState({ questionnaires: [...self.state.questionnaires, newQuestionnaire] });
            self.setState({ filteredQuestionnaires: [...self.state.filteredQuestionnaires, newQuestionnaire] }, () => { self.updatePage() });
        })
        .catch(function (response) {
            message.error('Failed to add new questionnaire - Could not connect to database')
        });
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
                            <div style={{marginLeft: '35px', marginRight: '35px', marginTop: '70px'}}>
                                <Breadcrumb>
                                    <Breadcrumb.Item style={{color: '#3466cb'}} href="/">Home</Breadcrumb.Item>
                                    <Breadcrumb.Item active>Admin Panel</Breadcrumb.Item>
                                </Breadcrumb>

                                <div style={listStyle}>
                                    <SearchBar questionnaires={currentQuestionnaires} filterSearch={this.filterSearch}/>

                                    <ListTitle refresh={this.refresh} />

                                    <Questionnaires questionnaires={currentQuestionnaires} delQuestionnaire={this.delQuestionnaire}/>

                                    <ListFooter addQuestionnaire={this.addQuestionnaire} indexOfFirstTodo={indexOfFirstTodo} 
                                    indexOfLastTodo={indexOfLastTodo} questionnaires={this.state.questionnaires}/>
                                    
                                    <div style={{marginBottom: '10px'}}>
                                        <PageNumbers states={this.state} handlePageClick={this.handlePageClick} />
                                    </div>

                                    <br></br>&nbsp;
                                    <div style={{marginTop: '10px'}}>
                                        <Statistics />
                                    </div>
                                </div>
                                
                            </div>
                            <Footer />
                        </div>

                        :
                        
                        <div style={{marginBottom: "20%"}}>
                            <LoggedOut />
                        </div>    
                    }  
                </div>
            )
            
        } else {
            return <div style={{textAlign: "center", paddingTop: "18%", marginBottom: "480px"}}>
                <Spinner animation="border" variant="primary">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        }
    }
}

const listStyle = {
    marginTop: '1%',
    marginLeft: '5%',
    marginRight: '5%',
}

message.config({
    top: 80
})

export default AdminPanel

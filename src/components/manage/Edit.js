import React, { Component } from 'react';
import { Button, Form, Col, Breadcrumb, Spinner } from 'react-bootstrap';
import { message, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';

import uuid from 'uuid';
import axios from 'axios';

import EditItem from './EditItem';
import PageNavigator from '../layout/PageNavigator';
import LoggedOut from '../pages/LoggedOut';
import Footer from '../layout/Footer';


class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: {},
            isReady: false,
            loadingButton: false
        };
    }

    componentDidMount() {
        // Get questionnaire id from URL parameter
        const pageUrl = window.location.origin;
        axios.get(pageUrl + '/api/getQuestionnaireByUid/' + this.props.match.params.uid + "/") 
         .then(res => this.setState({questionnaire: res.data})).then(() => this.setState({isReady: true}));
    }

    // Handle changes dynamically for selection choices and answer type each answer
    updateChange = (fieldName, value, id) => {
        const questionnaireCopy = this.state.questionnaire;
        questionnaireCopy.questionnaireContent.forEach((question) => {
            if (question.qid === id) {
                question[fieldName] = value;
            }
        })
        this.setState({questionnaire: questionnaireCopy});
    }

    // Handle changes dynamically for other fields (i.e. title, age group)
    handleChange = (e) => {
        const questionnaireCopy = this.state.questionnaire;
        questionnaireCopy[e.target.name] = e.target.value;
        this.setState({questionnaire: questionnaireCopy});
    }

    addQuestion = () => {
        const questionnaireCopy = this.state.questionnaire;
        const defaultAdd = {
            qid: uuid.v4(),
            questionText: "New Question",
            answerType: "Text Area",
            choices: ""
        }
        questionnaireCopy.questionnaireContent.push(defaultAdd);
        this.setState({ questionnaire: questionnaireCopy });
    }

    delQuestion = (id) => {
        const questionnaireCopy = this.state.questionnaire;
        const newQuestionnaireContent = questionnaireCopy.questionnaireContent.filter(question => question.qid !== id);
        questionnaireCopy.questionnaireContent = newQuestionnaireContent;
        this.setState({ questionnaire: questionnaireCopy });
    }

    shiftQuestionDown = (questionIndex) => {
        // When question is last question, do nothing
        if(questionIndex === this.state.questionnaire.questionnaireContent.length - 1){
            return;
        }
        const questionnaireCopy = this.state.questionnaire;
        var temp = questionnaireCopy.questionnaireContent[questionIndex];
        questionnaireCopy.questionnaireContent[questionIndex] = questionnaireCopy.questionnaireContent[questionIndex + 1];
        questionnaireCopy.questionnaireContent[questionIndex + 1] = temp;

        this.setState({ questionnaire: questionnaireCopy });
    }

    shiftQuestionUp = (questionIndex) => {
        // When question is first question, do nothing
        if(questionIndex === 0){
            return;
        }
        const questionnaireCopy = this.state.questionnaire;
        var temp = questionnaireCopy.questionnaireContent[questionIndex];
        questionnaireCopy.questionnaireContent[questionIndex] = questionnaireCopy.questionnaireContent[questionIndex - 1];
        questionnaireCopy.questionnaireContent[questionIndex - 1] = temp;

        this.setState({ questionnaire: questionnaireCopy });
    }

    saveChanges = () => {
        this.setState({loadingButton: true})
        const pageUrl = window.location.origin;
        var bodyFormData = new FormData();
        bodyFormData.append('1', JSON.stringify(this.state.questionnaire));
        axios({
            method: 'post',
            url: pageUrl + '/api/editQuestionnaireByUid/' + this.props.match.params.uid,
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(function () {
            window.location = "/manage"
        })
        .catch(function (response) {
            this.setState({loadingButton: false})
            message.error('Could not connect to database')
        });
    }

    render() {
        const allAges = [];
        for (var i= 1; i <= 50; i++){
            allAges.push(i)
        }

        if (this.state.isReady){
            return (
                <div>
                    { 

                    this.props.isAuthenticated ?

                    <div>
                        <div style={{marginLeft: '35px', marginRight: '35px', marginTop: '70px'}}>
                            <Breadcrumb>
                                <Breadcrumb.Item><Link to="/" style={{color: '#3466cb'}}>Home</Link></Breadcrumb.Item>
                                <Breadcrumb.Item><Link to="/manage" style={{color: '#3466cb'}}>Admin Panel</Link></Breadcrumb.Item>
                                <Breadcrumb.Item active>{this.state.questionnaire.title}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>


                        <div style={containerStyle}>
                            <div style={titleStyle}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label><b>Questionnaire Title</b></Form.Label>
                                        <Form.Control name="title" onChange={this.handleChange} defaultValue={this.state.questionnaire.title} />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label><b>Patient Min Age</b></Form.Label>
                                        <Form.Control as="select" name="minAge" onChange={this.handleChange} defaultValue={this.state.questionnaire.minAge}>
                                            {allAges.map(age => <option>{age}</option>)}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label><b>Patient Max Age</b></Form.Label>
                                        <Form.Control as="select" name="maxAge" onChange={this.handleChange} defaultValue={this.state.questionnaire.maxAge}>
                                            {allAges.map(age => <option>{age}</option>)}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label><b>Patient Type</b></Form.Label>
                                        <Form.Control as="select" name="patientType" onChange={this.handleChange} defaultValue={this.state.questionnaire.patientType}>
                                            <option>General</option>
                                            <option>Inpatient</option>
                                            <option>Outpatient</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                            </div>


                            <div style={{paddingLeft: '1%', paddingRight: '1%', paddingTop: '1%', backgroundColor: 'white'}}>
                                <div style={{paddingTop: '5px', paddingLeft: '1%', paddingRight: '1%', borderStyle: 'hidden', backgroundColor: '#f2f2f2'}}>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label><b>Questionnaire Description: (optional)</b></Form.Label>
                                            <Form.Control as="textarea" name="description" rows="3" onChange={this.handleChange} defaultValue={this.state.questionnaire.description} placeholder="Questionnaire Description..."/>
                                        </Form.Group>
                                    </Form.Row>
                                </div>
                            </div>


                            <div style={listStyle}>
                                <EditItem key={this.state.questionnaire.questionText} questions={this.state.questionnaire.questionnaireContent} 
                                updateChange={this.updateChange} qaireId={this.state.questionnaire.uid} delQuestion={this.delQuestion} 
                                shiftQuestionDown={this.shiftQuestionDown} shiftQuestionUp={this.shiftQuestionUp}/>
                            </div>


                            <header style={footerStyle}>
                                <Button style={{backgroundColor: '#0080ff'}} onClick={this.addQuestion}><b>+ Question</b></Button> &nbsp;
                                <Button style={{backgroundColor: '#00994d'}} disabled={this.state.loadingButton} onClick={this.saveChanges} variant="success">
                                    <b>{this.state.loadingButton? 'Loading...' : 'Save & Exit'}</b>
                                </Button>

                                <Popconfirm
                                    placement="topRight"
                                    title="Discard All Changes? This action cannot be undone."
                                    onConfirm={() => window.location="/manage"}
                                    okText="Discard"
                                    cancelText="Cancel"
                                >
                                    <Button style={{float: 'right', marginRight: '2%'}} variant="danger"><b>Discard Changes</b></Button>
                                </Popconfirm>
                                {/* <a href="/manage"><Button style={{backgroundColor: '#b30000', float: 'right', marginRight: '2%'}} variant="danger"><b>Discard All Changes</b></Button></a> */}
                            </header>
                        </div>
                        <Footer />
                        <PageNavigator/>
                    </div>

                    :

                    <LoggedOut/>
                    }
                       
                </div>
            );

        } else {
            return <div style={{textAlign: "center", paddingTop: "20%"}}>
                <Spinner animation="border" variant="primary"/>
            </div>
        }
    }
}

const listStyle = {
    padding: '2% 2% 0 2%',
    backgroundColor: 'white',
}

const containerStyle = {
    margin: '0 5% 2% 5%'
}

const titleStyle = {
    backgroundColor: '#252574',
    padding: '10px 10px 0 10px',
    color: 'white',
    borderRadius: '10px'
}

const footerStyle = {
    padding: '15px 0 15px 15px',
    background: '#252574'
}

message.config({
    top: 80
})

export default Edit;
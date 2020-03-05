import React, { Component } from 'react';
import { Button, Form, Col, Breadcrumb, Jumbotron, Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import uuid from 'uuid';
import axios from 'axios';

import EditItem from './EditItem';
import PageNavigator from '../layout/PageNavigator';


class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: {},
            isReady: false
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
        const pageUrl = window.location.origin;
        var bodyFormData = new FormData();
        bodyFormData.append('1', JSON.stringify(this.state.questionnaire));
        axios({
            method: 'post',
            url: pageUrl + '/api/editQuestionnaireByUid/' + this.props.match.params.uid,
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(function (response) {
            console.log(response);
        })
        .then(function () {
            window.location = "/manage"
        })
        .catch(function (response) {
            console.log(response);
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
                        <div style={breadCrumbStyle}>
                            <Breadcrumb style={breadCrumbStyle}>
                                <Breadcrumb.Item><Link to="/" style={{color: '#3466cb'}}>Home</Link></Breadcrumb.Item>
                                <Breadcrumb.Item><Link to="/manage" style={{color: '#3466cb'}}>Manage Questionnaires</Link></Breadcrumb.Item>
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
                                <Button style={{backgroundColor: '#0080ff'}} onClick={this.addQuestion}><b>+ Add Question</b></Button> &nbsp;
                                <Button style={{backgroundColor: '#00994d'}} onClick={this.saveChanges} variant="success"><b>Save and Exit</b></Button> &nbsp;
                                <a href="/manage"><Button style={{backgroundColor: '#b30000', float: 'right', marginRight: '2%'}} variant="danger"><b>Discard All Changes</b></Button></a>
                            </header>
                        </div>
                        <PageNavigator/>
                    </div>

                    :

                    <Jumbotron fluid>
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
            );

        } else {
            return <div style={{textAlign: "center", paddingTop: "10%"}}>
                <Spinner animation="border" variant="primary"/>
            </div>
        }
    }
}

const listStyle = {
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingTop: '2%',
    backgroundColor: 'white',
}

const containerStyle = {
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '2%',
}

const titleStyle = {
    backgroundColor: '#252574',
    paddingLeft: '1%',
    paddingRight: '1%',
    paddingTop: '1%',
    color: 'white'
}

const footerStyle = {
    paddingTop: '15px',
    paddingBottom: '15px',
    paddingLeft: '35px',
    background: '#252574'
}

const breadCrumbStyle = {
    marginTop: '1%',
    marginBottom: '1%',
    marginLeft: '20px',
    marginRight: '20px'
}

export default Edit;
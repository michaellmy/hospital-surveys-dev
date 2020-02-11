import React, { Component } from 'react';
import uuid from 'uuid';
import axios from 'axios';

import EditItem from './EditItem'
import Footer from '../layout/Footer';
import { Button, Form, Col, Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom';

class Edit extends Component {
    constructor(props) {
        super(props);
        const questionnaireId = this.props.match.params.uid; //Get questionnaire Id by url param
        this.state = {
            questionnaires: [...this.props.questionnaires.filter(questionnaire => String(questionnaire.uid) === questionnaireId)],
            ages: this.props.questionnaires.filter(questionnaire => String(questionnaire.uid) === questionnaireId).ages,
            patientType: this.props.questionnaires.filter(questionnaire => String(questionnaire.uid) === questionnaireId).patientType,
            isVisible: false
        };
    }

    componentDidMount() {
        const pageUrl = window.location.origin
        axios.get(pageUrl + '/api/getQuestionnairesByUid/' + this.props.match.params.uid + "/")
            .then(res => console.log("data: " + JSON.stringify(res.data)));
        /* axios.get('http://127.0.0.1:8000/api/getQuestionnairesByUid/' + this.props.match.params.uid + "/")
            .then(res => console.log("data: " + JSON.stringify(res.data))); */
    }

    updateChange = (fieldName, value, id, qaireId) => {
        const questionnaireId = this.props.match.params.uid;
        const questionnaireCopy = [...this.props.questionnaires.filter(questionnaire => String(questionnaire.uid) === questionnaireId)];
        questionnaireCopy.forEach((questionnaire) => {
            if (questionnaire.uid === qaireId) {
                questionnaire.questionnaireContent.forEach((question) => {
                    if (question.qid === id) {
                        question[fieldName] = value;
                        //console.log(question[fieldName]);
                    }
                })
            }
        })
    }

    addQuestion = () => {
        const questionnaireCopy = this.state.questionnaires;
        const defaultAdd = {
            qid: uuid.v4(),
            questionText: "New Question",
            answerType: "Text Area",
            choices: ""
        }
        questionnaireCopy.forEach(questionnaire => {
            questionnaire.questionnaireContent.push(defaultAdd);
        })
        this.setState({ questionnaire: questionnaireCopy });
    }

    delQuestion = (id) => {
        const questionnaireCopy = this.state.questionnaires[0];
        const newQuestionnaireContent = questionnaireCopy.questionnaireContent.filter(question => question.qid !== id);
        questionnaireCopy.questionnaireContent = newQuestionnaireContent;
        this.setState({ questionnaire: questionnaireCopy });
    }

    handleChange = (e) => {
        const questionnaireCopy = this.state.questionnaires;
        questionnaireCopy.forEach(questionnaire => {
            questionnaire[e.target.name] = e.target.value
        });
    }

    saveChanges = () => {
        const pageUrl = window.location.origin;
        var bodyFormData = new FormData();
        bodyFormData.append('1', JSON.stringify(this.state.questionnaires[0]));
        axios({
            method: 'post',
            url: pageUrl + '/api/editQuestionnaireByUid/' + this.props.match.params.uid,
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (response) {
                console.log(response);
            });
        //console.log(JSON.stringify(this.state.questionnaires))
    }

    render() {
        //console.log(this.state.questionnaires);
        const allAges = [];
        for (var i= 1; i <= 50; i++){
            allAges.push(i)
        }
        return this.state.questionnaires.map((questionnaire) => (
            <div>
                <div style={breadCrumbStyle}>
                    <Breadcrumb style={breadCrumbStyle}>
                        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>{questionnaire.title}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={containerStyle}>
                    <div style={titleStyle}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label><b>Questionnaire Title</b></Form.Label>
                                <Form.Control name="title" onChange={this.handleChange} defaultValue={this.state.questionnaires[0].title} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label><b>Patient Min Age</b></Form.Label>
                                <Form.Control as="select" name="minAge" onChange={this.handleChange} defaultValue={this.state.questionnaires[0].minAge}>
                                    {allAges.map(age => <option>{age}</option>)}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label><b>Patient Max Age</b></Form.Label>
                                <Form.Control as="select" name="maxAge" onChange={this.handleChange} defaultValue={this.state.questionnaires[0].maxAge}>
                                    {allAges.map(age => <option>{age}</option>)}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label><b>Patient Type</b></Form.Label>
                                <Form.Control as="select" name="patientType" onChange={this.handleChange} defaultValue={this.state.questionnaires[0].patientType}>
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
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label><b>Questionnaire Description: (optional)</b></Form.Label>
                                    <Form.Control as="textarea" name="description" rows="5" onChange={this.handleChange} defaultValue={this.state.questionnaires[0].description} placeholder="Questionnaire Description..."/>
                                </Form.Group>
                            </Form.Row>
                        </div>
                    </div>

                    <div style={listStyle}>
                        <EditItem key={questionnaire.questionText} questions={questionnaire.questionnaireContent} updateChange={this.updateChange} qaireId={questionnaire.uid} delQuestion={this.delQuestion} />
                    </div>

                    <header style={footerStyle}>
                        <Button variant="info" onClick={this.addQuestion}><b>+ Add Question</b></Button> &nbsp;
                        <Link to="/manage"><Button onClick={this.saveChanges} variant="success"><b>Save and Exit</b></Button></Link> &nbsp;
                        <a href="/manage"><Button style={{float: 'right', marginRight: '2%'}} variant="danger"><b>Discard All Changes</b></Button></a>
                        {/* <Button onClick={this.saveChanges} variant="success">Save and Exit</Button> */}
                        {/* To save changes for the UI active state, use <Link to></Link> instead of href. Currently planning to use POST request instead  */}
                    </header>
                </div>
                <Footer />
            </div>
        ));
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
    paddingBottom: '16px',
    paddingLeft: '35px',
    background: '#252574'
}

const breadCrumbStyle = {
    marginTop: '1%',
    marginBottom: '1%',
    background: 'blue'
}

export default Edit;
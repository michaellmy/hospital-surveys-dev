import React, { Component } from 'react';
import uuid from 'uuid';
import axios from 'axios';

import EditItem from './EditItem'
import Footer from '../layout/Footer';
import { Button, Form, Col, Breadcrumb, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

class Edit extends Component {
    constructor(props) {
        super(props);
        const questionnaireId = this.props.match.params.uid; // Get questionnaire id from URL parameter
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
    }

    // Handle changes dynamically for selection choices
    updateChange = (fieldName, value, id, qaireId) => {
        const questionnaireId = this.props.match.params.uid;
        const questionnaireCopy = [...this.props.questionnaires.filter(questionnaire => String(questionnaire.uid) === questionnaireId)];
        questionnaireCopy.forEach((questionnaire) => {
            if (questionnaire.uid === qaireId) {
                questionnaire.questionnaireContent.forEach((question) => {
                    if (question.qid === id) {
                        question[fieldName] = value;
                    }
                })
            }
        })
    }

    // Handle changes dynamically for other fields
    handleChange = (e) => {
        const questionnaireCopy = this.state.questionnaires;
        questionnaireCopy.forEach(questionnaire => {
            questionnaire[e.target.name] = e.target.value
        });
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

    shiftQuestionDown = (questionIndex) => {
        // When question is last question, do nothing
        if(questionIndex === this.state.questionnaires[0].questionnaireContent.length - 1){
            return;
        }
        const questionnaireCopy = this.state.questionnaires[0];
        var temp = questionnaireCopy.questionnaireContent[questionIndex];
        questionnaireCopy.questionnaireContent[questionIndex] = questionnaireCopy.questionnaireContent[questionIndex + 1];
        questionnaireCopy.questionnaireContent[questionIndex + 1] = temp;

        //console.log('origin ' + JSON.stringify(questionnaireCopy.questionnaireContent[questionIndex].questionText) + ', next is : ' + JSON.stringify(questionnaireCopy.questionnaireContent[questionIndex + 1].questionText));      
        this.setState({ questionnaire: questionnaireCopy });
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
    }

    render() {
        const allAges = [];
        for (var i= 1; i <= 50; i++){
            allAges.push(i)
        }
        return this.state.questionnaires.map((questionnaire) => (
            <div>
                <div style={breadCrumbStyle}>
                    <Breadcrumb style={breadCrumbStyle}>
                        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="/manage">Manage Questionnaires</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>{questionnaire.title}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div style={containerStyle}>
                    <Nav className="justify-content-end" activeKey="/home">
                        <Nav.Item>
                            <Nav.Link onClick={scroll.scrollToBottom}><b>Scroll To Bottom</b></Nav.Link>
                        </Nav.Item>
                    </Nav>

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
                                    <Form.Control as="textarea" name="description" rows="3" onChange={this.handleChange} defaultValue={this.state.questionnaires[0].description} placeholder="Questionnaire Description..."/>
                                </Form.Group>
                            </Form.Row>
                        </div>
                    </div>

                    <div style={listStyle}>
                        <EditItem key={questionnaire.questionText} questions={questionnaire.questionnaireContent} 
                        updateChange={this.updateChange} qaireId={questionnaire.uid} delQuestion={this.delQuestion} 
                        shiftQuestionDown={this.shiftQuestionDown} />
                    </div>

                    <header style={footerStyle}>
                        <Button style={{backgroundColor: '#0080ff'}} onClick={this.addQuestion}><b>+ Add Question</b></Button> &nbsp;
                        <Link to="/manage"><Button style={{backgroundColor: '#00994d'}} onClick={this.saveChanges} variant="success"><b>Save and Exit</b></Button></Link> &nbsp;
                        <a href="/manage"><Button style={{backgroundColor: '#b30000', float: 'right', marginRight: '2%'}} variant="danger"><b>Discard All Changes</b></Button></a>
                    </header>

                    <Nav className="justify-content-end" activeKey="/home">
                        <Nav.Item>
                            <Nav.Link onClick={scroll.scrollToTop}><b>Scroll To Top</b></Nav.Link>
                        </Nav.Item>
                    </Nav>
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
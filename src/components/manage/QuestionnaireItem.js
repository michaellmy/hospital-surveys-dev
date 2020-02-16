import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Table, Card, Button} from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import { Link } from 'react-router-dom';


export class QuestionnaireItem extends Component {
    constructor() {
        super()
        this.openDialog= this.openDialog.bind(this)
    }
    
    openDialog(uid) { // Delete questionnaire confirmation dialog
        const {title} = this.props.questionnaire;
        this.dialog.show({
            title: 'Confirm Delete',
            body: 'Permanently delete "' + title + '"?',
            bsSize: 'large',
            actions:[
                Dialog.CancelAction(),
                Dialog.OKAction(() => {
                    this.props.delQuestionnaire(uid)
                })
            ]
        })
    }

    render() {
        const { uid, title, minAge, maxAge, patientType, questionnaireContent } = this.props.questionnaire;
        const surveyLink = `manage/edit/${uid}`;

        return (
            <div>
                <Accordion>
                    <Card>
                        <Accordion.Toggle  as={Card.Header} eventKey="0">
                            <div style={cardStyle}>
                                <b>{title}</b>
                            </div>
                        </Accordion.Toggle>
                        <Dialog ref={(component) => {this.dialog = component}}></Dialog>

                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Table responsive striped hover>
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Category Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>No. of Questions</td>
                                            <td>{questionnaireContent.length}</td>
                                        </tr>
                                        <tr>
                                            <td>Patient Type</td>
                                            <td>{patientType}</td>
                                            
                                        </tr>
                                        <tr>
                                            <td>Patient Age Group</td>
                                            <td>{minAge} to {maxAge} years-old</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                
                                <Link to={surveyLink}><Button style={testStyle}><b>Edit Questionnaire</b></Button></Link>
                                <Button onClick={this.openDialog.bind(this, uid)} style={deleteStyle}><b>Delete Questionnaire</b></Button>    
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        )
    }
}

QuestionnaireItem.propTypes = {
    questionnaire: PropTypes.object.isRequired
}

const testStyle = {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginRight: '10px',
}

const deleteStyle = {
    backgroundColor: '#990000',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginRight: '10px',
}

const cardStyle = {
   paddingTop: '15px',
   paddingBottom: '15px',
   paddingLeft: '15px',
   cursor: 'pointer',
   color: '#285cb5'
}

export default QuestionnaireItem

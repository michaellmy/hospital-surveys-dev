import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Table, Card, Button, OverlayTrigger, Popover} from 'react-bootstrap';
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
        const viewResponsesLink = `responses/${uid}`;
        const answerLink = `${window.location.origin}/answer/${uid}`;

        const popover = (
            <Popover id="popover-basic">
                <Popover.Title as="h3">Share questionnaire link to answer</Popover.Title>
                <Popover.Content>
                    <a href={answerLink}>{answerLink}</a>
                </Popover.Content>
            </Popover>
        )

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
                                
                                <Link to={surveyLink}><Button style={rowButtons}><b>Edit Questionnaire</b></Button></Link>
                                    
                                <Link to={viewResponsesLink}><Button style={rowButtons} variant="primary"><b>View Questionanire Responses</b></Button></Link>

                                <OverlayTrigger trigger="click" placement="top" overlay={popover}> 
                                    <Button style={rowButtons} variant="info"><b>Share Questionnaire</b></Button>
                                </OverlayTrigger>

                                <Button onClick={this.openDialog.bind(this, uid)} variant="danger" style={{float: 'right'}}><b>Delete Questionnaire</b></Button>
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

const rowButtons = {
    marginRight: '10px',
    marginBottom: '10px'
}

const cardStyle = {
   paddingTop: '15px',
   paddingBottom: '15px',
   paddingLeft: '15px',
   cursor: 'pointer',
   color: '#285cb5'
}

export default QuestionnaireItem

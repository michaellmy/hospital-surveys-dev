import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Table, Card, Button, OverlayTrigger, Popover, Container, Row, Col} from 'react-bootstrap';
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
                <Popover.Title as="h3">Share Link to Respondent</Popover.Title>
                <Popover.Content>
                    <strong>A patient can click on the link to answer this survey: </strong><br></br>
                    <a href={answerLink} style={{textDecoration: 'underline'}}>{answerLink}</a>
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
                                            <th>Details</th>
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
                                
                                <Container fluid>
                                    <Row>
                                        <Col md={12} style={{paddingLeft: '0px'}}>
                                            <OverlayTrigger trigger="click" placement="top" overlay={popover}> 
                                                <Button style={rowButtons} variant="primary"><b>Share Questionnaire</b></Button>
                                            </OverlayTrigger>

                                            <Link to={viewResponsesLink}><Button style={rowButtons} variant="primary"><b>View Responses</b></Button></Link>
                                        </Col>
                                    </Row>
                                    
                                    <Row>
                                        <Col md={12} style={{paddingLeft: '0px'}}>
                                            <Link to={surveyLink}><Button style={rowButtons} variant="info"><b>Edit Questionnaire</b></Button></Link>

                                            <Button onClick={this.openDialog.bind(this, uid)} variant="danger" style={rowButtons}><b>Delete Questionnaire</b></Button>
                                        </Col>
                                    </Row>
                                </Container> 
                        
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
    width: '190px',
    margin: '5px'
}

const cardStyle = {
    padding: '1%',
    cursor: 'pointer',
    color: '#285cb5'
}

export default QuestionnaireItem

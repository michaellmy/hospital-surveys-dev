import React, { Component } from 'react';
import { Carousel, Card, Button } from 'react-bootstrap';
import Footer from '../layout/Footer';

import hospitalImg from '../logos/hospital.jpg';
import hospitalImg2 from '../logos/hospital2.jpg';
import hospitalImg3 from '../logos/hospital3.jpg';
import manageCard from '../logos/managecard.jpg';
import statisticsCard from '../logos/statisticscard.jpg';
import patientCard from '../logos/patientcard.jpg';

export class About extends Component {
    render() {
        return (
            <div style={{ position: 'relative' }}>
                <Carousel >
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={hospitalImg}
                            alt="First slide" 
                            height={400}
                        />
                        <Carousel.Caption>
                            <h3 style={Object.assign({}, darkCaptionStyle, {color: 'white'})}>Hospital Surveys</h3>
                            <h5 style={Object.assign({}, darkCaptionStyle, {color: '#d9d9d9'})}>Turn your surveys into digital forms.</h5>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={hospitalImg2}
                            alt="Second slide"
                            height={400}
                        />
                        <Carousel.Caption>
                            <h3 style={Object.assign({}, darkCaptionStyle, {color: 'white'})}>Analyze Results</h3>
                            <h5 style={Object.assign({}, darkCaptionStyle, {color: '#d9d9d9'})}>View and analyze questionnaires and responses.</h5>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={hospitalImg3}
                            alt="Third slide"
                            height={400}
                        />
                        <Carousel.Caption>
                            <h3 style={Object.assign({}, darkCaptionStyle, {color: 'white'})}>UCL | GOSH DRIVE</h3>
                            <h5 style={Object.assign({}, darkCaptionStyle, {color: '#d9d9d9'})}>A University College London IXN Student Project.</h5>
                        </Carousel.Caption>
                    </Carousel.Item> 

                </Carousel>

                <div style={btmList}>
                    <div style={cardRow}>
                        <Card style={cardStyle}>
                            <Card.Img variant="top" src={manageCard} height="170px" />
                            <Card.Body>
                                <Card.Title><b>Manage Surveys</b></Card.Title>
                                <Card.Text>
                                    View and manage all surveys in the admin panel.
                                </Card.Text>
                                <a href="/manage"><Button style={{backgroundColor: '#0066ff'}}variant="primary">Manage Questionnaires</Button></a>
                            </Card.Body>
                        </Card>

                        <Card style={cardStyle}>
                        <Card.Img variant="top" src={patientCard} height="170px" />
                            <Card.Body>
                                <Card.Title><b>A Patient?</b></Card.Title>
                                <Card.Text>
                                    Answer a survey by getting a link or entering the survey ID.
                                </Card.Text>
                                <a href="/answerSearch"><Button style={{backgroundColor: '#0066ff'}} variant="primary">Answer Questionnaires</Button></a>
                            </Card.Body>
                        </Card>

                        <Card style={cardStyle}>
                            <Card.Img variant="top" src={statisticsCard} height="170px" />
                            <Card.Body>
                                <Card.Title><b>View Statistics</b></Card.Title>
                                <Card.Text>
                                    View statistics on survey responses and analyze results.
                                </Card.Text>
                                <a href="/statistics"><Button style={{backgroundColor: '#0066ff'}} variant="primary">View Statistics</Button></a>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}


const btmList = {
    margin: '10px 1% 0 1%'
}

const cardRow = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
}

const cardStyle = {
    width: '17rem', 
    margin: '10px 1% 0 1%'
}

const darkCaptionStyle = {
    fontFamily: 'Verdana, Geneva, sans-seriff',
    textShadow: '-1px 0 black , 0 1px black, 1px 0 black, 0 -1px black',
}

export default About;
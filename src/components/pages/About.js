import React, { Component } from 'react';
import { Carousel, Navbar, Nav, Card, Button } from 'react-bootstrap';
import Footer from '../layout/Footer';

import hospitalImg from '../logos/hospital.jpg';
import hospitalImg2 from '../logos/hospital2.jpg';
import hospitalImg3 from '../logos/hospital3.jpg';
import goshlogo from '../logos/goshlogo.png';
import manageCard from '../logos/managecard.jpg';
import statisticsCard from '../logos/statisticscard.jpg';
import patientCard from '../logos/patientcard.jpg';

export class About extends Component {
    render() {
        return (
            <div style={{ position: 'relative' }}>
                <Navbar bg="dark" variant="dark" style={{ paddingLeft: '10%' }}>
                    <img src={goshlogo} style={logoStyle} alt="logo" />
                    <Navbar.Brand href="https://www.goshdrive.com/">Drive</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/manage">Manage</Nav.Link>
                        <Nav.Link href="/">About</Nav.Link>
                    </Nav>
                </Navbar>

                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={hospitalImg}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Hospital Surveys</h3>
                            <p>Turn your surveys into digital forms.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={hospitalImg2}
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3>Analyze your results</h3>
                            <p>View and analyze results from questionnaire responses.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={hospitalImg3}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3>University College London | GOSH Drive</h3>
                            <p>A UCL IXN Student Project.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <div style={btmList}>
                    <h2>Welcome to Hospital Surveys.</h2>
                    <div style={cardRow}>
                        <Card style={cardStyle}>
                            <Card.Img variant="top" src={manageCard} />
                            <Card.Body>
                                <Card.Title><b>Manage Your Questionnaires</b></Card.Title>
                                <Card.Text>
                                    View and manage all your existing questionnaires in the admin panel.
                                </Card.Text>
                                <a href="/manage"><Button style={{backgroundColor: '#0066ff'}}variant="primary">Manage Questionnaires</Button></a>
                            </Card.Body>
                        </Card>

                        <Card style={cardStyle}>
                            <Card.Img variant="top" src={statisticsCard} />
                            <Card.Body>
                                <Card.Title><b>View Statistics</b></Card.Title>
                                <Card.Text>
                                    View statistics and trends on questionnaire responses and analyze results.
                                </Card.Text>
                                <a href="/statistics"><Button style={{backgroundColor: '#0066ff'}} variant="primary">View Statistics</Button></a>
                            </Card.Body>
                        </Card>

                        <Card style={cardStyle}>
                        <Card.Img variant="top" src={patientCard} />
                            <Card.Body>
                                <Card.Title><b>A Patient?</b></Card.Title>
                                <Card.Text>
                                    Answer a questionnaire or survey by entering the questionnaire ID.
                                </Card.Text>
                                <a href="/"><Button style={{backgroundColor: '#0066ff'}} variant="primary">Answer Questionnaires</Button></a>
                            </Card.Body>
                        </Card>

                        
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const logoStyle = {
    width: '50px',
    height: '40px',
    display: 'inline-block',
    marginRight: '10px'
}

const btmList = {
    marginTop: '20px',
    marginLeft: '12%',
    marginRight: '5%'
}

const cardRow = {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: '-15px',
    marginLeft: '-15px'
}

const cardStyle = {
    width: '22rem', 
    marginTop: '30px', 
    marginRight: '30px'
}


export default About;
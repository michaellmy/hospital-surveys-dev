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
                {/* {<div stlye={{marginTop: '65px'}}>
                    <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top" style={{ backgroundColor: '#142952', paddingLeft: '20px' }}>
                        <Navbar.Brand href="/">
                            <img src={goshlogo} style={logoStyle} alt="logo"/>{' '}Hospital Surveys
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">                     
                            <Nav className="mr-auto">
                                <Nav.Item>
                                    <Nav.Link href="/manage">Manage</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link href="/">Answer</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link href="/statistics">Statistics</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>} */}
   
                <Carousel>
                    <Carousel.Item >
                        <img
                            className="d-block w-100"
                            src={hospitalImg}
                            alt="First slide" 
                        />
                        <Carousel.Caption>
                            <h3 style={Object.assign({}, captionStyle, {color: '#333333'})}>Hospital Surveys</h3>
                            <h5 style={Object.assign({}, captionStyle, {color: '#737373'})}>Turn your surveys into digital forms.</h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={hospitalImg2}
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3 style={Object.assign({}, darkCaptionStyle, {color: 'white'})}>Analyze Results</h3>
                            <h5 style={Object.assign({}, darkCaptionStyle, {color: '#cccccc'})}>View and analyze questionnaires and responses.</h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={hospitalImg3}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3 style={Object.assign({}, darkCaptionStyle, {color: 'white'})}>UCL | GOSH DRIVE</h3>
                            <h5 style={Object.assign({}, darkCaptionStyle, {color: '#cccccc'})}>A University College London IXN Student Project.</h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <div style={btmList}>
                    <div style={cardRow}>
                        <Card style={cardStyle}>
                            <Card.Img variant="top" src={manageCard} />
                            <Card.Body>
                                <Card.Title><b>Manage Questionnaires</b></Card.Title>
                                <Card.Text>
                                    View, Create, Edit and Manage all questionnaires in the admin panel. Staff only, please!
                                </Card.Text>
                                <a href="/manage"><Button style={{backgroundColor: '#0066ff'}}variant="primary">Manage Questionnaires</Button></a>
                            </Card.Body>
                        </Card>

                        <Card style={cardStyle}>
                        <Card.Img variant="top" src={patientCard} />
                            <Card.Body>
                                <Card.Title><b>A Patient?</b></Card.Title>
                                <Card.Text>
                                    Answer a questionnaire or survey by entering the link to the questionnaire.
                                </Card.Text>
                                <a href="/"><Button style={{backgroundColor: '#0066ff'}} variant="primary">Answer Questionnaires</Button></a>
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
                            <Card.Img variant="top" src={manageCard} />
                            <Card.Body>
                                <Card.Title><b>Manage Questionnaires</b></Card.Title>
                                <Card.Text>
                                    View, Create, Edit and Manage all questionnaires in the admin panel. Staff only, please!
                                </Card.Text>
                                <a href="/manage"><Button style={{backgroundColor: '#0066ff'}}variant="primary">Manage Questionnaires</Button></a>
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
    textAlign: 'center',
    marginTop: '10px',
    marginLeft: '5%',
    marginRight: '5%'
}

const cardRow = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
}

const cardStyle = {
    width: '18rem', 
    marginTop: '30px', 
    marginRight: '15px'
}

const captionStyle = {
    fontFamily: 'Verdana, Geneva, sans-seriff',
    textShadow: '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white',
}

const darkCaptionStyle = {
    fontFamily: 'Verdana, Geneva, sans-seriff',
    textShadow: '-1px 0 black , 0 1px black, 1px 0 black, 0 -1px black',
}

export default About;
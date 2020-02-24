import React, { Component } from 'react';
import { Carousel, Navbar, Nav, Card, Button } from 'react-bootstrap';
import Footer from '../layout/Footer';
import SideBarMenu from '../layout/SideBarMenu';

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
                <Navbar variant="dark" style={{ backgroundColor: '#142952', paddingLeft: '70px' }}>
                    <img src={goshlogo} style={logoStyle} alt="logo" />
                    <Navbar.Brand href="https://www.goshdrive.com/">Drive</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/manage">Manage</Nav.Link>
                        <Nav.Link href="/statistics">Statistics</Nav.Link>
                    </Nav>
                </Navbar>

                <SideBarMenu/>
                <Carousel style={{height: "100%"}}>
                    <Carousel.Item style={{height:"100%"}}>
                        <img
                            className="d-block w-100"
                            src={hospitalImg}
                            alt="First slide" 
                        />
                        <Carousel.Caption>
                            <h3 style={Object.assign({}, captionStyle, {color: '#333333'})}>HOSPITAL SURVEYS</h3>
                            <h4 style={Object.assign({}, captionStyle, {color: '#737373'})}>Turn your surveys into digital forms.</h4>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={hospitalImg2}
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3 style={Object.assign({}, darkCaptionStyle, {color: 'white'})}>ANALYZE RESULTS</h3>
                            <h4 style={Object.assign({}, darkCaptionStyle, {color: '#cccccc'})}>View and analyze questionnaires and responses.</h4>
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
                            <h4 style={Object.assign({}, darkCaptionStyle, {color: '#cccccc'})}>A University College London IXN Student Project.</h4>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <div style={btmList}>
                    <h3><b>Welcome to Hospital Surveys.</b></h3>
                    <hr style={{marginRight: '80px'}}></hr>
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
    marginTop: '20px',
    marginLeft: '12%',
    marginRight: '5%'
}

const cardRow = {
    display: 'flex',
    flexWrap: 'wrap',
}

const cardStyle = {
    width: '18rem', 
    marginTop: '30px', 
    marginRight: '15px'
}

const captionStyle = {
    fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
    textShadow: '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white',
}

const darkCaptionStyle = {
    fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
    textShadow: '-1px 0 black , 0 1px black, 1px 0 black, 0 -1px black',
}

export default About;
import React, { Component } from 'react'
import { Spinner, Jumbotron, Container, Button, Col, Image } from 'react-bootstrap';
import axios from 'axios';
import ResponseTable from './ResponseTable';

import Footer from '../layout/Footer';
import tumbleWeed from '../logos/tumbleweed.png'

export class ViewResponse extends Component {
    constructor(props){
        super(props);
        this.state = {
            responses: [],
            isReady: false
        }
    }

    componentDidMount(){
        const baseUrl = window.location.origin; 
        const getUrl = baseUrl + '/api/getAnswerByUid/' + this.props.match.params.uid;
        axios.get(getUrl) 
         .then(res => this.setState({responses: res.data}))
         .then(() => this.setState({isReady: true}));
    }

    render() {
        if (this.state.isReady) {
            return (
                <div>
                    <div style={responseStyle}>
                        {
                            this.state.responses.length === 0 ?
                            
                            <div>
                                <h3>Total Responses: {this.state.responses.length}</h3>
                                <hr style={{borderColor: 'grey'}}></hr>

                                <Jumbotron fluid>
                                    <Container>
                                        <Col xs={6} md={4}>
                                        <Image src={tumbleWeed} rounded />
                                        <br></br>&nbsp;
                                        </Col>
                                        <h1>No Responses Available</h1>
                                        <p>
                                            There are no responses for this survey yet.
                                        </p>
                                        <p>
                                            <a href="/manage"><Button variant="primary">Go Back</Button></a>
                                        </p>
                                    </Container>
                                </Jumbotron>
                            </div>

                            :

                            <div>
                                <h3>Total Responses: {this.state.responses.length}</h3>
                                <hr style={{borderColor: 'grey'}}></hr>


                                {this.state.responses.map((response, index) => (
                                    <div>
                                        <ResponseTable key={response.uid} response={response} responseNum={index + 1}/>      
                                        <hr style={{borderColor: 'grey', marginTop: '25px', marginBottom: '15px'}}></hr>
                                    </div>
                                ))}
                                
                            </div> 
                        }
                    </div>
                    <Footer/>
                </div>
            )
        } else {
            return (
                <div style={{padding: '20% 0 0 0', textAlign: 'center'}}>
                    <Spinner animation="border" variant="primary">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            )
        }
    }
}

const responseStyle = {
    paddingTop: '15px',
    paddingLeft: '5%',
    paddingRight: '5%'
}

export default ViewResponse

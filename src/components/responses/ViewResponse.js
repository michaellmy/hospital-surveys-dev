import React, { Component } from 'react'
import { Spinner, Jumbotron, Container, Button, Col, Image, Row } from 'react-bootstrap';
import { Row as AntRow, Col as AntCol } from 'antd'
import axios from 'axios';
import ResponseTable from './ResponseTable';
import LoggedOut from '../pages/LoggedOut';

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
                    {
                        this.props.isAuthenticated ?
                        
                        <div>
                            {
                                this.state.responses.length === 0 ?
                                
                                <div style={responseStyle}>
                                    <AntRow>
                                        <AntCol span={8}><h4>Total Responses: {this.state.responses.length}</h4></AntCol>
                                        <AntCol span={8} offset={8}><Button style={{float: 'right'}}variant="danger">Delete All Responses</Button></AntCol>
                                    </AntRow>
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
                                    <div style={responseStyle}>
                                        <AntRow>
                                            <AntCol span={8}><h4>Total Responses: {this.state.responses.length}</h4></AntCol>
                                            <AntCol span={8} offset={8}><Button style={{float: 'right'}}variant="danger">Delete All Responses</Button></AntCol>
                                        </AntRow>
                                        <hr style={{borderColor: 'grey'}}></hr>


                                        {this.state.responses.map((response, index) => (
                                            <div>
                                                <ResponseTable key={response.uid} response={response} responseNum={index + 1}/>      
                                                <hr style={{borderColor: 'grey', marginTop: '25px', marginBottom: '15px'}}></hr>
                                            </div>
                                        ))}
                                        
                                    </div> 
                                    <Footer/>
                                </div>
                            }
                        </div>

                        :

                        <div>
                            <LoggedOut/>
                        </div>
                    }
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
    padding: '15px 5% 0 5%'
}

export default ViewResponse

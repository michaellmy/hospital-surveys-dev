import React, { Component } from 'react'
import { Spinner, Jumbotron, Container, Button, Col, Image } from 'react-bootstrap';
import { Row as AntRow, Col as AntCol, Popconfirm } from 'antd';
import axios from 'axios';

import ResponseTable from './ResponseTable';
import LoggedOut from '../pages/LoggedOut';
import CsvDownloader from 'react-csv-downloader';
import Footer from '../layout/Footer';
import tumbleWeed from '../logos/tumbleweed.png';


export class ViewResponse extends Component {
    constructor(props){
        super(props);
        this.state = {
            responses: [],
            isReady: false,
            buttonLoading: false
        }
    }

    componentDidMount(){
        const baseUrl = window.location.origin; 
        const getUrl = baseUrl + '/api/getAnswerByUid/' + this.props.match.params.uid;
        axios.get(getUrl) 
         .then(res => this.setState({responses: res.data}))
         .then(() => this.setState({isReady: true}));
    }

    deleteResponses = () => {
        this.setState({buttonLoading: true})
        const getUrl = window.location.origin + '/api/getAnswerByUid/' + this.props.match.params.uid;
        axios({
            method: 'get',
            url:  `${window.location.origin}/api/deleteAnswersByUid/${this.props.match.params.uid}/`,
            headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(() =>
            axios.get(getUrl) 
            .then(res => this.setState({responses: res.data}))
        )
        .then(() => this.setState({buttonLoading: false}))
        .catch(() => this.setState({buttonLoading: false}))
    }

    convertToCSV = (data) => {
        var result = []
        data.forEach((response) => {
            response.questionAnswer.forEach((answer) => {
                result.push({uid: response.uid, age: response.age, Title: answer.questionText, Answer: answer.answer})
            })
        }) 
        return result
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
                                
                                <div style={{padding: '15px 5% 0 5%'}}>
                                    <AntRow>
                                        <AntCol span={24}><h4>Total Responses: {this.state.responses.length}</h4></AntCol>
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
                                                There are no responses to this survey yet.
                                            </p>
                                            <p>
                                                <a href="/manage"><Button variant="primary">Go Back</Button></a>
                                            </p>
                                        </Container>
                                    </Jumbotron>
                                </div>

                                :

                                <div>
                                    <div style={{padding: '15px 5% 0 5%'}}>
                                        <AntRow>
                                            <AntCol span={8}>
                                                <h4>Total Responses: {this.state.responses.length}</h4>
                                                <CsvDownloader text="&nbsp; Export as CSV &nbsp;" datas={this.convertToCSV(this.state.responses)} filename={`responses_csv`} columns={columns} wrapColumnChar="'"/>
                                            </AntCol>

                                            <AntCol span={8} offset={8}>                                                                      
                                                <Popconfirm
                                                    placement="bottomRight"
                                                    title="Delete All Responses? This action cannot be undone."
                                                    onConfirm={this.deleteResponses}
                                                    okText="Delete"
                                                    cancelText="Cancel"
                                                >
                                                    <Button type="primary" disabled={this.state.buttonLoading} style={{float: 'right', backgroundColor: '#990000', borderColor: '#990000'}}>
                                                        {this.state.buttonLoading ? 'Loading...' : 'Delete All Responses'}
                                                    </Button>
                                                </Popconfirm>
                                            </AntCol>
                                        </AntRow>

                                        <hr style={{borderColor: 'grey'}}></hr>

                                        { this.state.responses.map((response, index) => (
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

const columns = [
    {
        id: 'uid',
        displayName: 'Questionnaire ID'
    },
    {
        id: 'age',
        displayName: 'Respondent Age'
    },
    {
        id: 'Title',
        displayName: 'Question Title'
    }, 
    {
        id: 'Answer',
        displayName: 'Question Answer'
    }
]

export default ViewResponse

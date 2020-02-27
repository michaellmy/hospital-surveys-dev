import React, { Component } from 'react'
import axios from 'axios';
import ResponseTable from './ResponseTable';

export class ViewResponse extends Component {
    constructor(props){
        super(props);
        this.state = {
            responses: [],
            isReady: false
        }
    }

    componentDidMount(){
        const baseUrl = 'https://hospital-surveys-dev.herokuapp.com';
        const getUrl = baseUrl + '/api/getAnswerByUid/e6fcb81f-f0ab-433c-b8b8-14c9c90c9af4';
        axios.get(getUrl) 
         .then(res => this.setState({responses: res.data}))
         .then(() => this.setState({isReady: true}));
    }

    render() {
        if (this.state.isReady) {
            return (
                <div style={responseStyle}>
                    <h3>Total Responses: {this.state.responses.length}</h3>
                    <hr style={{borderColor: 'grey'}}></hr>

                    {this.state.responses.map((response, index) => (
                        <div>
                            <ResponseTable key={response.uid} response={response} responseNum={index + 1}/>      
                            <hr style={{borderColor: 'grey', marginTop: '25px', marginBottom: '15px'}}></hr>
                        </div>
                    ))}
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Loading</h1>
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

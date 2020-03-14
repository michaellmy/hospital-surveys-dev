import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Header from '../layout/Header'
import { Input } from 'antd'
import { Link } from 'react-router-dom';


const { Search } = Input

export class Answer extends Component {
    state = {
        typedID: ""
    }

    handleChange = (e) => {
        this.setState({typedID: e.target.value})
    }

    navigateToSurvey = (value) => {
        const answerUrl = `/answer/${value}`
        window.location = answerUrl
    }

    render() {
        return (
            <div>
                <Header/>
                <div style={searchContainer}>
                    <div style={searchBox}>
                        <h4>Enter Questionnaire ID:</h4>
                        <p>Enter questionnaire ID to answer the questionnaire.</p>
                        <Search placeholder="Questionnaire ID" onSearch={value => this.navigateToSurvey(value)} enterButton />
                        <br></br>&nbsp;
                        <div style={{textAlign: 'center'}}>
                            <Link to="/"><Button variant="primary" style={{textAlign: 'center'}}>Return to Home Page</Button></Link>
                        </div>
                        
                    </div>      
                </div>
            </div>
        )
    }
}

const searchBox = {
    marginLeft: '30px',
    marginRight: '30px',
    paddingTop: '30px',
    paddingBottom: '30px'
}

const searchContainer = {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '100px',
    backgroundColor: '#d8e5f3',
}

export default Answer

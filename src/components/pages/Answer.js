import React, { Component } from 'react';
import {InputGroup, Button, FormControl} from 'react-bootstrap';
import Header from '../layout/Header'
import {Link} from 'react-router-dom';

export class Answer extends Component {
    state = {
        typedID: ""
    }

    handleChange = (e) => {
        this.setState({typedID: e.target.value})
    }

    render() {
        const answerUrl = `/answer/${this.state.typedID}`
        return (
            <div>
                <Header/>
                <div style={searchContainer}>
                    <div style={searchBox}>
                        <h4>Enter Questionnaire ID:</h4>
                        <p>Enter questionnaire ID to answer the questionnaire.</p>
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Questionnaire ID"
                            aria-describedby="basic-addon2"
                            onChange={this.handleChange}
                            />
                            <InputGroup.Append>
                                <Link to={answerUrl}><Button variant="primary">Go</Button></Link>
                            </InputGroup.Append>
                        </InputGroup>
                        <br></br>
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

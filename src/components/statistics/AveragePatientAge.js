import React, { Component } from 'react';
import axios from 'axios';

import { Card } from 'react-bootstrap'

export class AveragePatientAge extends Component {
    state = {
        data: 0
    }

    componentDidMount(){
        axios.get(window.location.origin + '/api/getAverageAge/')
        .then(res => this.setState({data: res.data}))
    }

    render() {

        return (
            <div>
                <Card bg="light"border="secondary" style={this.props.cardItem}>
                    <Card.Header><h5>Average Patient Age</h5></Card.Header>
                    <Card.Body>
                        <h3>Responses - Average Age of Patients: <br></br>{Math.round(this.state.data * 100) / 100}
                        </h3>
                    </Card.Body>
                    
                </Card>
            </div>
        )
    }
}

export default AveragePatientAge

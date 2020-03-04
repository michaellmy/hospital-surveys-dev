import React, { Component } from 'react';
import axios from 'axios';

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
                <h3 style={{textAlign: 'center'}}>Responses - Average Age of Patients: <br></br>{Math.round(this.state.data * 100) / 100}
                </h3>
            </div>
        )
    }
}

export default AveragePatientAge

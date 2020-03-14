import React, { Component } from 'react';
import axios from 'axios';
import { Descriptions } from 'antd';
import 'antd/dist/antd.css';

export class AveragePatientAge extends Component {
    state = {
        data: 0,
        averageMonth: 0
    }

    componentDidMount(){
        axios.get(window.location.origin + '/api/getAverageAge/')
        .then(res => this.setState({data: res.data}))
        axios.get(window.location.origin + '/api/getAllDateList/')
        .then(res => this.processDates(res.data))
    }

    processDates = (datesArray) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ]

        var total = 0;
        datesArray.forEach((date) => {
            total += parseInt(date.split('/')[1])
        })
        var average = total / datesArray.length 
        average = Math.round(average)
        this.setState({averageMonth: monthNames[average - 1]}) 
    }

    render() {
        return (
            <div style={{backgroundColor: 'whitesmoke'}}>
                <Descriptions
                    bordered
                    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                >
                    <Descriptions.Item label="Average Respondent Age"><strong>{Math.round(this.state.data * 100) / 100}</strong></Descriptions.Item>
                    <Descriptions.Item label="Mean Response Month"><strong>{this.state.averageMonth}</strong></Descriptions.Item>
                </Descriptions>
            </div>
        )
    }
}

export default AveragePatientAge

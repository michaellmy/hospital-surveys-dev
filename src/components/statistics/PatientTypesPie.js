import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';

const options = {
    //maintainAspectRatio: false
    responsive: true,
};

function getPercentage(value, total) {
    return ((value / total) * 100);
}

export class PatientTypesBar extends Component {
    constructor(props){
		super(props)
        this.state = {
            data : {
                labels: ['General', 'Inpatient', 'Outpatient'],
                datasets: [
                  {
                    label: 'No. of Questionnaires',
                    backgroundColor: ['#000099','#006699', '#0088cc'],
                    borderColor: ['#000099','#006699', '#0088cc'],
                    borderWidth: 1,
                    hoverBackgroundColor: '#5cd6d6',
                    hoverBorderColor: '#5cd6d6',
                    data: [0, 0, 0]
                  }
                ]
            },
            ready: false
        }
    }
    
    componentDidMount() {
         axios.get(window.location.origin + '/api/getAllQuestionnaires/')
		.then(res => this.processData(res.data)).then(this.setState({ready: true}))
    }
    
    processData  = (resData) => {
        var dataCopy = this.state.data;
        resData.forEach(questionnaire => {
            if (questionnaire.patientType === "General"){
                dataCopy.datasets[0].data[0] = dataCopy.datasets[0].data[0] + 1
            }
            else if (questionnaire.patientType === "Inpatient"){
                dataCopy.datasets[0].data[1] = dataCopy.datasets[0].data[1] + 1
            }
            else if (questionnaire.patientType === "Outpatient"){
                dataCopy.datasets[0].data[2] = dataCopy.datasets[0].data[2] + 1
            }
        });
        this.setState({data: dataCopy})
    } 

    render() {
        var total = this.state.data.datasets[0].data[0] + this.state.data.datasets[0].data[1] 
                    + this.state.data.datasets[0].data[2]

        console.log(total)
        console.log('percentage1 :' + this.state.data.datasets[0].data[0] / total)
        if(this.state.ready){
            return (
                <div>
                    <Pie data={this.state.data} options={options} />
                    <br></br>
                    <ProgressBar>
                        <ProgressBar label="General" style={{backgroundColor: "#000099"}} now={getPercentage(this.state.data.datasets[0].data[0], total)} key={1} />
                        <ProgressBar label="Inpatient" style={{backgroundColor: "#006699"}} now={getPercentage(this.state.data.datasets[0].data[1], total)} key={2} />
                        <ProgressBar label="Outpatient" style={{backgroundColor: "#0088cc"}} now={getPercentage(this.state.data.datasets[0].data[2], total)} key={3} />
                    </ProgressBar>
                </div>
            )
        }
        else{
            return <div></div>
        }
    }
}

export default PatientTypesBar

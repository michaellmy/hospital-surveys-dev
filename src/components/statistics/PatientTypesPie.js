import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const options = {
    maintainAspectRatio: false,
    responsive: true
};

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
        if(this.state.ready){
            return (
                <div>
                    <Pie data={this.state.data} height={300} options={options} />
                </div>
            )
        }
        else{
            return <div></div>
        }
    }
}

export default PatientTypesBar

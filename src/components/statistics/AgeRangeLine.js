import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            },
            scaleLabel: {
                display: true,
                labelString: 'No. of Questionnaires'
            }
        }],
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Patient Age / Years'
            }
        }
        ]
    } 
};

function generateAgeRange() {
    const allAges = [];
    for (var i= 1; i <= 20; i++){
        allAges.push(i)
    }
    return allAges;
}

export class AgeRange extends Component {
    constructor(props){
		super(props)
        this.state = {
            data : {
                labels: generateAgeRange(),
                datasets: [
                  {
                    label: 'Patient Age',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#4080bf',
                    borderColor: '#4080bf',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#4080bf',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
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
            var minAge = questionnaire.minAge;
            var maxAge = questionnaire.maxAge;
            for(var i = minAge; i <= maxAge; i ++){
                dataCopy.datasets[0].data[i-1] =  dataCopy.datasets[0].data[i-1] + 1
            }
        });
        
        this.setState({data: dataCopy})
    } 

    render() {
        if(this.state.ready){
            return (
                <div>
                    <Line data={this.state.data} width={100} height={300} options={options} />
                </div>
            )
        }
        else{
            return <div></div>
        }
    }
}

export default AgeRange
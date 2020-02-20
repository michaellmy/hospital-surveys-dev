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
            }
        }]
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
                    label: 'Age Range of Questionnaires',
                    backgroundColor: '#006699',
                    borderColor: '#000099',
                    borderWidth: 1,
                    hoverBackgroundColor: '#5cd6d6',
                    hoverBorderColor: '#5cd6d6',
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
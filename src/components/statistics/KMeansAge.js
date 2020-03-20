import React, { Component } from 'react'
import { Bubble } from 'react-chartjs-2'
import axios from 'axios'

const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Patient Age / Years Old'
            }
        }],
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Centroid Position for Cluster / Years Old'
            }
        }
        ]
    } 
};

export class KMeansAge extends Component {
    componentDidMount(){
        axios.get(window.location.origin + '/api/getAllAgeList/')
        .then(res => this.processData(res.data, 3))
        .then(() => this.setState({ready: true}))
    }

    processData = (resData, k) => {
        if(resData.length < k){
            return
        }
        const skmeans = require("skmeans");
        var res = skmeans(resData, k);

        var newData = [[],[], []]
        resData.forEach((point, index) => {
            var obj = {};
            obj["x"] = (res.centroids[res.idxs[index]])
            obj["y"] = point
            obj["r"] = 6
            newData[res.idxs[index]].push(obj)
        })

        var dataCopy = this.state.data
        newData.forEach((data, index) => (
            dataCopy.datasets[index].data = data
        ))
        this.setState({data: dataCopy})

    }

    constructor(props){
		super(props)
        this.state = {
            data: {
                datasets : 
                [
                    {
                        label: 'Cluster 1',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'blue',
                        borderColor: 'rgba(75,192,192,1), black',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [{x:10, y:20, r:6}]
                    },
                    {
                        label: 'Cluster 2',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'green',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [{x:10,y:20,r:6}]
                    } ,
                    {
                        label: 'Cluster 3',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'red',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [{x:10,y:20,r:6}]
                    } 
                ]
            },       
            ready: false
        }
    }

    render() {
        if(this.state.ready){
            return (
                <div>
                    <Bubble data={this.state.data} width={100} height={300} options={options}/>
                </div>
                
            )
        } else{
            return <div/>
        }
        
    }
}

export default KMeansAge

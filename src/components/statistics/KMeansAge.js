import React, { Component } from 'react'
import { Bubble } from 'react-chartjs-2'
import {Card,} from 'react-bootstrap';

export class KMeansAge extends Component {
    componentDidMount(){
        /* const sample = [[1,12,13,4,25,21,22,3,14,5,11,2,23,24,15]] */   
        const k = 3
        const sample = [1,3,6,7,8,33,39,42,49,35,72,80,91,78,99,100,101]
        this.processData(sample, k)
        this.setState({ready: true})
    }

    processData = (resData, k) => {
        //TODO if sample size less k than then return 
        if(resData.length < k){
            return
        }
        const skmeans = require("skmeans");
        var res = skmeans(resData, k);

        var newData = [[],[],[]]
        resData.forEach((point, index) => {
            var obj = {};
            obj["x"] = (res.centroids[res.idxs[index]])
            obj["y"] = point
            obj["r"] = 4
           // obj["x: " + (point+xDiff[index])] = "y: " + point;
            newData[res.idxs[index]].push(obj)
        })

        console.log(newData)

        var dataCopy = this.state.data
        newData.forEach((data, index) => (
            dataCopy.datasets[index].data = data
        ))
        //dataCopy.datasets[0].data = newData
        this.setState({data: dataCopy})

    }

    constructor(props){
		super(props)
        this.state = {
            data: {
                labels: ['Jn'],
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
                        data: [{x:10,y:20,r:6}]
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
                    },
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
                    <Card bg="light"border="secondary" style={this.props.cardItem}>
                            <Card.Header><h5>Kmeans Cluster</h5></Card.Header>
                            <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">KMeans clustering of different patient age groups</Card.Subtitle>
                                <Bubble data={this.state.data} width={100} height={60}/>
                            </Card.Body>
                    </Card>
                </div>
            )
        } else{
            return <div/>
        }
        
    }
}

export default KMeansAge
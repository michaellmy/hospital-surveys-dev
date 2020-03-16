import React, { Component } from 'react';
import { Image, Container, Row, Col } from 'react-bootstrap';
import trendlogo from '../logos/trends.png';
import analyzelogo from '../logos/analyze.png';
import "./stats.css"

export class Statistics extends Component {
    render() {
        return (
            <div className="row">
                <div className="column">
                    <img src={analyzelogo} alt="Snow" style={imgStyle} />
                </div>
                <div className="column">
                    <img src={trendlogo} alt="Forest" style={imgStyle} />
                </div>
            </div>
            
        )
    }
}


const imgStyle = {
    width: '100%',
    float: 'right',
    padding: '0 30px 0 30px'
}

const statisticsStyle = {
    marginTop: '3%',
    marginBottom: '15%'
}

const trends = {
    width:'40%',
    marginLeft: '8%',
    float:'left'
}

const analyzeResults = {
    width:'40%',
    marginRight: '8%',
    float:'right'
}

export default Statistics;

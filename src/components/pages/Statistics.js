import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import trendlogo from '../logos/trends.png';
import analyzelogo from '../logos/analyze.png';

export class Statistics extends Component {
    render() {
        return (
            <div style={statisticsStyle}>
                <br></br>
                <a href="/statistics"><Image style={trends} src={trendlogo}></Image></a>
                <a href="/statistics"><Image style={analyzeResults} src={analyzelogo}></Image></a>
            </div>
        )
    }
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

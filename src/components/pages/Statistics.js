import React, { Component } from 'react';
import trendlogo from '../logos/trends.png';
import analyzelogo from '../logos/analyze.png';
import "./stats.css"

export class Statistics extends Component {
    render() {
        return (
            <div className="row">
                <div className="column">
                    <a href="/statistics"><img src={analyzelogo} alt="Snow" style={imgStyle} /></a>
                </div>
                <div className="column">
                <a href="/statistics"><img src={trendlogo} alt="Forest" style={imgStyle} /></a>
                </div>
            </div>
            
        )
    }
}


const imgStyle = {
    width: '100%',
    float: 'right',
    padding: '15px 30px 0 30px'
}

export default Statistics;

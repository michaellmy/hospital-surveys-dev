import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

export class ResponseTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            isReady: false
        }
    }

    render() {
            return (
                <div style={tableStyle}>
                    <div>
                        <h5 style={{display: 'inline-block'}}>Response Number: {this.props.responseNum}&emsp;|&emsp;Date Submitted: {this.props.response.date}<br></br>Respondent Age: {this.props.response.age}</h5>
                        {/* <h5 style={{display: 'inline-block', float:'right'}}>Date Submitted: {this.props.response.date}</h5>
                        <h5 style={{display: 'inline-block', float:'right'}}>Respondent Age: {this.props.response.age}&emsp;&ensp;</h5> */}
                    </div>
                    
                    <Table striped bordered hover responsive="sm">
                        <thead>
                            <tr>
                                <th style={{width: "4%", backgroundColor: "#003366", color: "white"}}>#</th>
                                <th style={{width: "10%", backgroundColor: "#003366", color: "white"}}>Answer Type</th>
                                <th style={{width: "43%", backgroundColor: "#003366", color: "white"}}>Question Title</th>
                                <th style={{width: "43%", backgroundColor: "#003366", color: "white"}}>Patient Response</th>
                                
                            </tr>
                        </thead>
                        <tbody> 
                            
                            {this.props.response.questionAnswer.map((answer, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{answer.answerType}</td>
                                    <td>{answer.questionText}</td>
                                    <td>{answer.answer}</td>
                                </tr>
                            ))}
                            
                        </tbody> 
                    </Table>

                </div>
            )
    }
}

const tableStyle = {
    marginLeft: '30px',
    marginRight: '30px'
}

export default ResponseTable

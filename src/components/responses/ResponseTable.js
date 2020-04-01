import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Descriptions } from 'antd'

export class ResponseTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isReady: false
        }
    }

    render() {
        return (
            <div style={tableStyle}>
                <div>
                    <strong>Questionnaire Response Info</strong>
                    <Descriptions>
                        <Descriptions.Item label="Response Number">{this.props.responseNum}</Descriptions.Item>
                        <Descriptions.Item label="Date Submitted">{this.props.response.date}</Descriptions.Item>
                        <Descriptions.Item label="Respondent Age">{this.props.response.age}</Descriptions.Item>
                    </Descriptions>
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

import React, { Component } from 'react';
import EditQuestion from './EditQuestion'

export class EditItem extends Component {
    render() {
        return this.props.questions.map((question, index) => (
            <div>
                <div style={listStyle}>
                    <EditQuestion key={question.qid} question={question} updateChange={this.props.updateChange} 
                    qaireId={this.props.qaireId} delQuestion={this.props.delQuestion} questionNum={index} />
                </div>
                <br></br>
            </div>
        ))
    }
}

const listStyle = {
    paddingTop: '1%',
    paddingLeft: '1%',
    paddingRight: '1%',
    borderStyle: 'hidden',
    backgroundColor: '#f2f2f2'
}

export default EditItem

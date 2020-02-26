import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export class ListFooter extends Component {
    render() {
        return (
            <div>
                <header style={createStyle}>
                  <Button onClick={this.props.addQuestionnaire} style={newStyle}><b>+ New</b></Button>
                  <div style={totalLabel}>
                    <b>Showing:</b> {this.props.indexOfFirstTodo + 1}-{this.props.indexOfLastTodo} / {this.props.questionnaires.length}
                  </div>
                </header>
            </div>
        )
    }
}

const totalLabel = {
    color:'white',
    float:'right',
    paddingTop:'15px',
    paddingRight:'10px'
}

const createStyle = {
    background: '#252574',
    paddingLeft: '30px'
}

const newStyle = {
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#007BFF'
}

export default ListFooter

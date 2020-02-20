import React, { Component } from 'react';
import { Button, Form, Col } from 'react-bootstrap';

export class EditQuestion extends Component {
    state = {
        MAX_CHOICES: 8,
        question: this.props.question,
        qid: this.props.question.qid,
        questionText: this.props.question.questionText,
        answerType: this.props.question.answerType,
        choices: this.props.question.choices.split(" | ") // Array - Parsing 'choices' in this class
    }

    handleChange = e => {
        if( e.target.name === "answerType" && e.target.value === "Text Area"){
            this.setState({ choices: []})
            this.props.updateChange("choices", "", this.state.qid);
        }

        this.setState({ [e.target.name]: e.target.value })
        this.props.updateChange(e.target.name, e.target.value, this.state.qid);
    }

    handleChoices = e => {
        let choicesCopy = this.state.choices;
        choicesCopy[parseInt([e.target.name])] = e.target.value;
        this.setState({ choices: choicesCopy })
        this.props.updateChange("choices", choicesCopy.join(" | "), this.state.qid);
    }

    deleteChoice = () => {
        let choicesCopy = this.state.choices;
        choicesCopy.pop();
        this.setState({ choices: choicesCopy})
        this.props.updateChange("choices", choicesCopy.join(" | "), this.state.qid);
    }

    addChoice = () => {
        let choicesCopy = this.state.choices;
        if(choicesCopy.length < this.state.MAX_CHOICES){
            choicesCopy.push("");
            this.setState({choices: choicesCopy});
        }
        this.props.updateChange("choices", choicesCopy.join(" | "), this.state.qid);
    }

    renderSwitch = (answerType) => {
        if (answerType === "Text Area") {
            return (
            <div>
                <Button style={addChoiceStyle} onClick={() => this.props.shiftQuestionDown(this.props.questionNum)}
                variant="info"><b>Shift Down</b></Button>
            </div> )
        }
        else 
        {
            return <div>
                <Form.Label>
                    <b>Edit Selections: </b>
                </Form.Label>

                {
                    this.state.choices.map((choice, index) =>
                        <div>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Control name={index} onChange={this.handleChoices} defaultValue={choice} />
                                </Form.Group>
                                
                            </Form.Row>
                        </div>
                    )
                } 

                <Form.Row>
                    <Button style={addChoiceStyle} onClick={this.addChoice} variant="info"><b>+ Add Selection</b></Button>
                    <Button style={removeChoiceStyle} onClick={this.deleteChoice} variant="danger"><b>Remove 1 Selection</b></Button>
                    &nbsp; &nbsp;
                    <Button style={addChoiceStyle} onClick={() => this.props.shiftQuestionDown(this.props.questionNum)} variant="info"><b>Shift Down</b></Button>
                </Form.Row>
            </div>
        }
    }

    render() {
        return (
            <div>
                <Form.Row>

                    <Form.Group as={Col} >
                        <Form.Label><b>Question {parseInt(this.props.questionNum) + 1}.</b></Form.Label>
                        <Form.Control name="questionText" onChange={this.handleChange} defaultValue={this.state.questionText} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label><b>Answer Type</b></Form.Label>
                        <Form.Control as="select" name="answerType" onChange={this.handleChange} defaultValue={this.state.answerType}>
                            <option>Text Area</option>
                            <option>Selections</option>
                        </Form.Control>

                    </Form.Group>
                    <Button style={{backgroundColor: '#990000'}} onClick={this.props.delQuestion.bind(this, this.state.qid)}>X</Button>

                </Form.Row>
                {this.renderSwitch(this.state.answerType)}
                <br />
            </div>
        )
    }
}

const addChoiceStyle = {
    marginLeft: '10px',
    backgroundColor: '#009999'
}

const removeChoiceStyle = {
    marginLeft: '10px',
    backgroundColor: '#990000'
}


export default EditQuestion

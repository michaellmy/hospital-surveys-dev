import React from 'react';
import { Form } from 'react-bootstrap'
import { Slider } from 'antd';
import 'antd/dist/antd.css';

const sliderMarks = {
  0: {label: <strong>0</strong>},
  100: {label: <strong>100</strong>}
}

export class QuestionType extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        choices: this.props.questionnaireContent.choices.split(" | "),
        questionData:{},
      
      };
    }
    
    handleChangeSlider = (val) => {
      const questionData = {    
        questionText: this.props.questionnaireContent.questionText , 
        answer:  val + '%',
        answerType: this.props.questionnaireContent.answerType,
        qid: this.props.questionnaireContent.qid
      }
      this.setState({ questionData: questionData });
      this.props.getQuestionData(questionData);
    }

    handleChange = (event) => {   
      const questionData = {    
        questionText: this.props.questionnaireContent.questionText , 
        answer:  event.target.value==='Select choice' ? '' :  event.target.value,
        answerType: this.props.questionnaireContent.answerType,
        qid: this.props.questionnaireContent.qid
      }
      this.setState({ questionData: questionData });
      this.props.getQuestionData(questionData);
      
    }


    render() {
      const { answerType,questionText } = this.props.questionnaireContent;  
      if (answerType === 'Text Area'){
        return ( 
          <React.Fragment>
            <Form onChange={this.handleChange} >
              <Form.Group >
                <Form.Label><strong>{this.props.questionNum + ') ' + questionText}</strong></Form.Label>
                <Form.Control as="textarea" rows="3" />
                {(this.state.questionData.answer === undefined || this.state.questionData.answer.length === 0) && 
                                    <span style={error}>*Please answer</span>}
              </Form.Group>
            </Form>
            <hr></hr>
          </React.Fragment >
        );

      } else if (answerType === 'Slider'){
        return (
          <div>
              <Form.Label><strong>{this.props.questionNum + ') ' + questionText}</strong></Form.Label>
              <Slider defaultValue={30} marks={sliderMarks} tipFormatter={null} onChange={this.handleChangeSlider}/>
              <br></br>
              <hr></hr>
          </div>
        )

      } else if (answerType ==='Selections') {
        return (
          <React.Fragment>
              <Form onChange={this.handleChange}>
                <Form.Group >
                  <Form.Label><strong>{this.props.questionNum + ') ' + questionText}</strong></Form.Label>
                  <Form.Control as="select"  >
                    <option>Select Choice</option>
                  {
                    this.state.choices.map((choice) =>  <option>{choice}</option>)
                  }               
                  </Form.Control>  
                  {(this.state.questionData.answer === undefined || this.state.questionData.answer.length === 0) && 
                                  <span style={error}>*Please answer</span>}          
                </Form.Group>
            </Form>
            <hr></hr>
        </React.Fragment>
        );
      }
    }
  }

  export default QuestionType;


  const error =  {
    color: 'red',
    fontSize: 10,
    display: 'relative'
  } 
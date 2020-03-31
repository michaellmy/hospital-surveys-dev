import React from 'react';
import { Form } from 'react-bootstrap'
import { Slider, Checkbox, Row, Col } from 'antd';
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


    handleChangeCheckboxes = (checkedValues) => {   
      var answer = checkedValues.join(", ")
      if(answer === ""){
        answer = "(None)"
      }
      const questionData = {    
        questionText: this.props.questionnaireContent.questionText , 
        answer: answer,
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
                                    <span style={error}>*Please Answer</span>}
              </Form.Group>
            </Form>
            <hr></hr>
          </React.Fragment >
        );

      } else if (answerType === 'Slider'){
        return (
          <div>
              <Form.Label><strong>{this.props.questionNum + ') ' + questionText}</strong></Form.Label>
              <Slider defaultValue={50} marks={sliderMarks} tipFormatter={null} onChange={this.handleChangeSlider}/>
              <hr></hr>
          </div>
        )

      } else if (answerType === 'Checkboxes'){
        return (
          <div>
              <Form.Label><strong>{this.props.questionNum + ') ' + questionText}</strong></Form.Label><br></br>
              <Checkbox.Group style={{width:'100%'}} onChange={this.handleChangeCheckboxes} >
                <Row>
                  {
                    this.state.choices.map((choice) => 
                    <Col span={24} style={{margin: '0 0 9px 0'}}>
                      <Checkbox value={choice}>{choice}</Checkbox>
                    </Col>
                    )
                  }
                </Row>
              </Checkbox.Group>
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
                                  <span style={error}>*Please Answer</span>}          
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
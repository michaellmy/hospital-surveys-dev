import React, { Component } from 'react';
import QuestionType from './QuestionType'
import PropTypes from 'prop-types';


class QuestionnaireComposite extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      questionAnswer: []    
    };
  }

  getQuestionData = (questionData) => {
    this.props.l(questionData);
  }

  render(){
    return this.props.questionnaire.questionnaireContent.map((questionnaireContent, index) => (
      <QuestionType key={questionnaireContent.qid} questionnaireContent={questionnaireContent} 
        getQuestionData={this.getQuestionData} questionNum={index + 1}/>));
  }
 }


// PropTypes
QuestionnaireComposite.propTypes = {
    questionnaires: PropTypes.array.isRequired
}

export default QuestionnaireComposite;


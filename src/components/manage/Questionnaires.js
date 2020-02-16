import React, { Component } from 'react';
import QuestionnaireItem from './QuestionnaireItem'
import PropTypes from 'prop-types';


class Questionnaires extends Component {
  render(){
    return this.props.questionnaires.map((questionnaire) => (
      <QuestionnaireItem key={questionnaire.uid} questionnaire = {questionnaire} delQuestionnaire={this.props.delQuestionnaire}/>
    ));
  }
}

Questionnaires.propTypes = {
    questionnaires: PropTypes.array.isRequired,
    delQuestionnaire: PropTypes.func
}

export default Questionnaires;
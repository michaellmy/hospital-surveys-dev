import React, { Component } from 'react';
import QuestionnaireItem from './QuestionnaireItem'
import PropTypes from 'prop-types';


class Questionnaires extends Component {
  render(){
    //console.log(this.props.questionnaires)
    return this.props.questionnaires.map((questionnaire) => (
      <QuestionnaireItem key={questionnaire.uid} questionnaire = {questionnaire} delQuestionnaire={this.props.delQuestionnaire}/>
    ));
  }
}

// PropTypes
Questionnaires.propTypes = {
    questionnaires: PropTypes.array.isRequired
}

export default Questionnaires;
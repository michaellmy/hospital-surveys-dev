import React, { Component } from 'react';
import QuestionnaireComposite from './QuestionnaireComposite'
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap'
import axios from 'axios';
import { Form } from 'react-bootstrap'

//edit empty window

class Questionnaire extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      questionsAnswer: [],
      questionnaire: '',
      age: ''
         
    };
  }

  // componentDidMount(){
  //   axios.get('https://hospital-surveys-dev.herokuapp.com/api/getAllQuestionnaires/')
  //     .then(res => this.setState({questionnaires: res.data}));
  //   // axios.get(window.location.origin + '/api/getAllQuestionnaires/')
  //   //         .then(res => this.setState({questionnaires: res.data}))
            
  // }

//   componentDidMount() {
//     // Get questionnaire id from URL parameter
//     const pageUrl = window.location.origin;
//     axios.get(pageUrl + '/api/getQuestionnaireByUid/' + this.props.match.params.uid + "/") 
//      .then(res => this.setState({questionnaire: res.data}));
// }


  getAllQuestionsData = (questionsData) => {
    const questionsCopy = this.state.questionsAnswer
    if(questionsCopy.filter((index)=> index.qid==questionsData.qid).length != 0){
      questionsCopy[questionsCopy.findIndex((index)=> index.qid===questionsData.qid)] = questionsData
    }
    else{
    questionsCopy.push(questionsData);
    }
    this.setState({questionsAnswer: questionsCopy})
  }
  
 

  addQuestionnaireAnswer = () => {
    const questionnaireAnswer = {
        "uid":  this.props.questionnaires[0].uid,
        "date": this.getDate(),
        "age":this.state.age,
        "questionAnswer": this.state.questionsAnswer
    };
    
    var bodyFormData = new FormData();
    bodyFormData.append('1', JSON.stringify(questionnaireAnswer));
    
    axios({
        method: 'post',
        url:  'https://hospital-surveys-dev.herokuapp.com/api/addAnswer/',
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (response) {
        console.log(response);
    });
  }

  handleChange = (event) => {       
    this.setState({ age: event.target.value ===''| undefined  ? ((this.props.questionnaires[0].maxAge+this.props.questionnaires[0].maxAge)/2) :  event.target.value,});      
  }

  getDate = () => {
    var tempDate = new Date();
    var date =  tempDate.getDate() +  '/' +tempDate.getMonth()+1 + '/' + tempDate.getFullYear() ;
    const currDate = date;
    return currDate;
  }

  render(){
    const ages = [...Array(100).keys()]
    if (this.props.questionnaires.length === 1){
    return (
      <div>

      <Form onChange={this.handleChange}>                     
            <Form.Label>What is your age?</Form.Label>
            <Form.Control as="select" size = 'sm' style={formcontrol} >
              
              {
                ages.map((age)=>  <option>{age}</option>)
              }
            </Form.Control>          
      </Form>
      <br></br>
        <QuestionnaireComposite questionnaire = {this.props.questionnaires[0] }  l={this.getAllQuestionsData}  />
        <Button style={{backgroundColor: '#00994d'}}  variant="success"  onClick={this.addQuestionnaireAnswer} ><b>Submit</b></Button> 
          
      </div>    
    )}
    else{
      return <p>Please write id</p>
    }
  }
}

// PropTypes
Questionnaire.propTypes = {
    questionnaires: PropTypes.array.isRequired
}

export default Questionnaire;


const formcontrol = {
  width: '10%'
}
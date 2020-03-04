import React, { Component } from 'react';
import QuestionnaireComposite from './QuestionnaireComposite'
import PropTypes from 'prop-types';
import { Button, Jumbotron, Form, Alert } from 'react-bootstrap'
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

//edit empty window

class Questionnaire extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      questionsAnswer: [],
      questionnaire: undefined,
      age: '',
      isReady: false,
      errorMessage: null
    };
  }

  componentDidMount(){
    axios.get(window.location.origin + '/api/getQuestionnaireByUid/' + this.props.match.params.uid + "/") 
      .then(res => this.setState({questionnaire: res.data}))
      .then(() => this.setState({isReady: true}))
      .catch(this.setState({isReady: false}))
  }

  changeErrorState = () => {
    this.setState({errorMessage: 
        <div>
            <Alert variant="danger">
                <h5 style={{textAlign: 'center'}}>Could Not Submit Answers - Have you filled in all questions?</h5>
            </Alert>
        </div>})
  }


  getAllQuestionsData = (questionsData) => {
    const questionsCopy = this.state.questionsAnswer
    if(questionsCopy.filter((index)=> index.qid === questionsData.qid).length !== 0){
      questionsCopy[questionsCopy.findIndex((index)=> index.qid===questionsData.qid)] = questionsData
    }
    else{
    questionsCopy.push(questionsData);
    }
    this.setState({questionsAnswer: questionsCopy})
  }
  
 
  addQuestionnaireAnswer = () => {
    var self = this
    const questionnaireAnswer = {
        "uid":  this.state.questionnaire.uid,
        "date": this.getDate(),
        "age": this.state.age,
        "questionAnswer": this.state.questionsAnswer
    };
    
    var bodyFormData = new FormData();
    bodyFormData.append('1', JSON.stringify(questionnaireAnswer));
    
    axios({
        method: 'post',
        url:  window.location.origin + '/api/addAnswer/',
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
    })
    .then(function (response) {
        window.location = "/"
    })
    .catch(function (response) {
        self.changeErrorState()
    });
  }


  handleChange = (event) => {       
    this.setState({ age: event.target.value ===''| undefined  ? ((this.state.questionnaire.maxAge + this.state.questionnaire.maxAge)/2) :  event.target.value,});      
  }


  getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    return today;
  }


  render(){
    const ages = [...Array(100).keys()]

    if (this.state.isReady === true){
      return (
        <div>
          <Jumbotron>
            <h1>{this.state.questionnaire.title}</h1>
            <p>
              {this.state.questionnaire.description}
            </p>
          </Jumbotron>

          <div style={listStyle}>
            <Form onChange={this.handleChange}>                     
                  <Form.Label>First off, how old are you?</Form.Label>
                  <Form.Control as="select" size='sm' style={formcontrol} >
                    {
                      ages.map((age)=> <option>{age}</option>)
                    }
                  </Form.Control>          
            </Form>
            <br></br>
            <QuestionnaireComposite questionnaire = {this.state.questionnaire }  l={this.getAllQuestionsData}  />
            <Button size="lg" block style={{backgroundColor: '#00994d'}}  variant="success"  onClick={this.addQuestionnaireAnswer} ><b>Submit Answers</b></Button>
            <br></br> 
            {this.state.errorMessage}
          </div> 
        </div>    
    )}
    else {
      return (
        <Jumbotron>
          <h1>Questionnaire Not Found</h1>
          <p>
            Sorry, we couldn't find that questionnaire. Are you sure that questionanire exists?
          </p>
          <p><Link to="/answerSearch"><Button>Search Again</Button></Link></p>
          <p><Link to="/"><Button>Return to Home Page</Button></Link></p>
        </Jumbotron>
      )
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

const listStyle = {
  marginLeft: '5%',
  marginRight: '5%',
  marginTop : '30px'
}
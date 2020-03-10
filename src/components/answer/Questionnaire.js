import React, { Component } from 'react';
import QuestionnaireComposite from './QuestionnaireComposite'
import { Button, Jumbotron, Form, Alert, Container, Spinner } from 'react-bootstrap'
import { Result, Button as AntButton } from 'antd'
import axios from 'axios';
import { Link} from 'react-router-dom';
import Footer from '../layout/Footer';

//edit empty window

class Questionnaire extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      questionsAnswer: [],
      questionnaire: undefined,
      age: '',
      isReady: false,
      errorMessage: null, // Submit response error
      noQuestionnaireError: null,
      questionnaireExists: true
    };
  }

  componentDidMount(){
    var self = this;
    axios.get(window.location.origin + '/api/getQuestionnaireByUid/' + this.props.match.params.uid + "/")
      .then(res => this.setState({questionnaire: res.data}))
      .then(() => this.setState({isReady: true}))
      .catch((e) => self.noQuestionnaireError(e))
      .then(() => this.setState({isReady: true}))
  }

  changeErrorState = () => {  
    this.setState({errorMessage: 
        <div>
            <Alert variant="danger">
                <h5 style={{textAlign: 'center'}}>Could Not Submit Answers - Have you filled in all questions?</h5>
            </Alert>
        </div>})
  }

  noQuestionnaireError = (e) => {
    this.setState({questionnaireExists: false})
    this.setState({noQuestionnaireError:
      <div>
        <Jumbotron>
          <Container>
            <h1>Questionnaire Not Found</h1>
            <p>
              Sorry, we couldn't find that questionnaire. Are you sure that questionanire exists?
            </p>
            <p><Link to="/answerSearch"><Button>Search Again</Button></Link></p>
            <p><Link to="/"><Button>Return to Home Page</Button></Link></p>
          </Container>
        </Jumbotron>
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

    if (this.state.questionnaireExists === false){
      return (
        <div>
          <Result
            status="404"
            title="Could Not Find Questionnaire"
            subTitle="Sorry, this questionnaire does not exist."
            extra={<AntButton type="primary" onClick={() => window.location = "/answerSearch"}>Search Again</AntButton>}
          />
        </div>
      )
    }

    if (this.state.isReady === true){
      return (
        <div>
          <Jumbotron>
            <Container>
              <h1>{this.state.questionnaire.title}</h1>
              <p>
                {this.state.questionnaire.description}
              </p>
            </Container>
            
          </Jumbotron>

          <div style={listStyle}>
            <Form onChange={this.handleChange}>                     
                  <Form.Label>First off, how old are you?</Form.Label>
                  <Form.Control as="select" style={formcontrol} >
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
          <Footer />
        </div>    

    )}

    else {
      return (
        <div>
          <div style={{textAlign: 'center', padding: '20px 0 20px 0'}}>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        </div>
      )
    }
  }
}

export default Questionnaire;

const formcontrol = {
  width: '20%'
}

const listStyle = {
  margin: '30px 5% 0 5%'
}
import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Jumbotron, Container, Spinner, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import Header from '../layout/Header';
import Footer from '../layout/Footer';

import * as actions from '../../store/actions/auth';


class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.userName, values.password);
      }
    });
  };

  render() {
    let errorMessage = null;
    if(this.props.error){
        errorMessage = (
           <div>
               <Alert variant="danger">
                    <h5 style={{textAlign: 'center'}}>Authentication Failed - Username or Password is incorrect.</h5>
                </Alert>
           </div>  )
    }

    const { getFieldDecorator } = this.props.form;
    return (
        <div>
            <Header/>
            <Jumbotron fluid>
                <Container>
                    <h1 style={{color: '#000080'}}>Login to View and Manage Questionnaires</h1>
                    <p style={{color: '#52527a'}}>
                    You are seeing this page because you are either not logged in, or your session
                    has expired.
                    </p>
                </Container>
            </Jumbotron>

            {errorMessage}
            
            <div style={containerBox}>
                <h4 style={{marginBottom: '20px'}}>Admin Login</h4>
                {
                    this.props.loading ?

                    <Spinner animation="border" variant="primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>

                    :

                    <div>            
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                size='large' 
                                placeholder="Username"
                            />,
                            )}
                            </Form.Item>
                            
                            <br></br>
                            <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your password!' }],
                            })(
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                />,
                            )}
                            </Form.Item>
                                
                            <br></br>
                            <Form.Item>
                                <Button style={loginStyle} htmlType="submit" size="large" >
                                    <b>Login</b>
                                </Button>
                            </Form.Item>
                        </Form>    
                    </div>
                }
            </div>
            <Footer />
        </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = (state) =>{
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
    
}

const containerBox = {
    paddingTop: '20px',
    paddingBottom: '5%',
    paddingLeft: '15px',
    paddingRight: '15px',
    textAlign: 'center',
}

const loginStyle = {
    backgroundColor: '#1a66ff',
    border: 'none',
    color: 'white',
    padding: '15px 32px'
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
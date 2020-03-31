import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Jumbotron, Container, Spinner, Alert, Image } from 'react-bootstrap';
import { connect } from 'react-redux';

import Header from '../layout/Header';
import lockAndKey from '../logos/lockandkey.png';

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
            <Jumbotron fluid style={{backgroundColor: '#dae4f1'}}>
                <Container>
                    <Image src={lockAndKey} rounded />
                    <h1 style={{color: '#00264d'}}>Sign in to view and manage questionnaires</h1>
                    <p style={{color: '#52527a'}}>
                    You are seeing this page because you are either not logged in, or your session
                    has expired.
                    </p>
                </Container>
            </Jumbotron>
 
            
            <div style={container}>
                {errorMessage}
                {
                    this.props.loading ?

                    <Spinner style={{marginTop: '30px'}} animation="border" variant="primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>

                    :

                    <div style={containerBox}>  
                        <h5 style={{marginBottom: '25px'}}>Admin Login</h5>          
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username.' }],
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
                                rules: [{ required: true, message: 'Please input your password.' }],
                            })(
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                size='large' 
                                placeholder="Password"
                                />,
                            )}
                            </Form.Item>
                                
                            <br></br>
                            <Form.Item>
                                <Button  style={loginStyle} htmlType="submit" size="large" >
                                    <b>Login</b>
                                </Button>
                            </Form.Item>
                        </Form>    
                    </div>
                }
            </div>
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
    padding: '5% 10% 13px 10%',
    backgroundColor: '#c8d6ea',
    textAlign: 'center',
}

const container = {
    textAlign: 'center',
    padding: '0px 20px 35px 20px',
    marginLeft: '20%',
    marginRight: '20%',
}

const loginStyle = {
    backgroundColor: '#1a66ff',
    border: 'none',
    color: 'white',
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
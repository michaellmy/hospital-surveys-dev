import React, { Component } from 'react';
import { Breadcrumb, Jumbotron, Button, Nav, Container} from 'react-bootstrap';

import ListTitle from '../layout/ListTitle';
import ListFooter from '../layout/ListFooter';

import SearchBar from '../manage/SearchBar';
import PageNumbers from '../manage/PageNumbers';
import Questionnaires from '../manage/Questionnaires';

import Statistics from '../pages/Statistics';


export class AdminPanel extends Component {
    render() {
        return (
            <div>
                {
                    this.props.isAuthenticated ?

                    <div>
                        <Breadcrumb style={{ marginTop: '1%' }}>
                            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                            <Breadcrumb.Item href="#">
                                Dashboard
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Manage Questionnaires</Breadcrumb.Item>
                        </Breadcrumb>

                        <div style={listStyle}>
                            <SearchBar questionnaires={this.props.currentQuestionnaires} filterSearch={this.props.filterSearch}/>
                            <ListTitle refresh={this.props.refresh} />
                            <Questionnaires questionnaires={this.props.currentQuestionnaires} delQuestionnaire={this.props.delQuestionnaire}/>
                            <ListFooter addQuestionnaire={this.props.addQuestionnaire} indexOfFirstTodo={this.props.indexOfFirstTodo} indexOfLastTodo={this.props.indexOfLastTodo} questionnaires={this.props.questionnaires}/>
                            <PageNumbers states={this.props.states} handlePageClick={this.props.handlePageClick} />
                            <br></br>&nbsp;
                            <Statistics />
                        </div>
                    </div>

                    :

                    <Jumbotron fluid>
                        <Container>
                            <h1 style={{color: '#000080'}}>Login to View and Manage Questionnaires</h1>
                            <p style={{color: '#52527a'}}>
                            You are seeing this page because you are either not logged in, or your session
                            has expired.
                            </p>
                            <p>
                                <Button href="/login/" variant="primary">Sign In</Button>&nbsp;&nbsp;
                                <Button href="/" variant="primary">Return to Home Page</Button>
                            </p>
                        </Container>
                    </Jumbotron>
                }
            </div>
        )
    }
}

const listStyle = {
    marginTop: '1%',
    marginLeft: '7%',
    marginRight: '7%',
  }

export default AdminPanel

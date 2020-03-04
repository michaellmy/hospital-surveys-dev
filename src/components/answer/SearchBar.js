import React, { Component } from 'react'
import {InputGroup, Form,Card} from 'react-bootstrap'

export class SearchBar extends Component {

    render() {
       
      if (this.props.k && this.props.k.length === 1)
        return (
            <div>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1" ><img src="search.png" height="24px" alt="searchicon"></img></InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control placeholder="Type id here..." onChange={this.props.filterSearch}/>
                </InputGroup>
                <br></br>
                <Card  bg="primary"   >
                    <Card.Body style={footerStyle}>{this.props.k[0].title}</Card.Body>
                </Card>
                <br></br>
                <br></br>
            </div>
        )
        else{
          return (
            <div>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1" ><img src="search.png" height="24px" alt="searchicon"></img></InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control placeholder="Type questionnaire id" onChange={this.props.filterSearch}/>
                </InputGroup>
            </div>
          )
            }
        
    }
}

const footerStyle = {
  paddingBottom: '16px',
  paddingLeft: '35px',
  background: '#252574',
  color: 'white'
}

export default SearchBar

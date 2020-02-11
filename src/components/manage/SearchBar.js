import React, { Component } from 'react'
import {InputGroup, Form} from 'react-bootstrap'
import searchLogo from '../logos/search.png'

export class SearchBar extends Component {
    render() {
        return (
            <div>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1" ><img src={searchLogo} height="24px" alt="searchicon"></img></InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control placeholder="Search Questionnaires..." onChange={this.props.filterSearch}/>
                </InputGroup>
            </div>
        )
    }
}

export default SearchBar

import React, { Component } from 'react'

export class ResponseRow extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: ""
        }
    }

    componentDidMount(){
       // console.log(this.props.answer)
        var title = this.props.getQuestionTitle(this.props.answer.qid)
        //console.log(title)
        this.setState({title: title})
    }

    render() {
        return (
            <div>
                <td>{this.state.title}</td>
                <td>{this.props.answer.answer}</td>
                <td>{this.props.answer.answerType}</td>
            </div>  
        )
    }
}

export default ResponseRow

import React, { Component } from 'react'
import { Pagination, PageItem } from 'react-bootstrap'

export class PageNumbers extends Component {
    render() {
        const { filteredQuestionnaires, questionnairesPerPage, currentPage } = this.props.states;
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredQuestionnaires.length / questionnairesPerPage); i++) {
            pageNumbers.push(i);
        }

        return pageNumbers.slice(0).reverse().map(number => (
            <div>
                <div style={PageNumStyle}>
                    <Pagination>
                        <PageItem active={number===currentPage} id={number} onClick={this.props.handlePageClick}>{number}</PageItem>&nbsp;
                    </Pagination>
                </div>
            </div>
        ));
    }
}

const PageNumStyle = {
    paddingTop: '10px',
    float: 'right',
    textAlign: 'center'
}

export default PageNumbers

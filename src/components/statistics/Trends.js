import React, { Component } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { Card, Jumbotron, Container } from 'react-bootstrap';

import PatientTypesPie from './PatientTypesPie';
import AgeRangeLine from './AgeRange';

/* Ideas: 
1. Number of responses per month - Horizontal Bar
2. Responses chose for a certain question - Radar
3. Predictive charts using simple algorithms?
*/

export class Statistics extends Component {
	render() {
		return (
			<div>
				<Header />
				<Jumbotron style={{backgroundColor: '#d6e0f5'}}>
					<Container>
						<h1>Welcome to Statistics!</h1>
						<p>
						On this page, you can view general statistics about different questionnaire and response data.
						</p>
					</Container>
				</Jumbotron>
				<div style={cardRow}>
					<Card bg="light"border="secondary" style={cardItem}>
						<Card.Header><h5>Patient Type Proportions</h5></Card.Header>
						<Card.Body>
						<Card.Subtitle className="mb-2 text-muted">Number of questionnaires directed towards different types of patients.</Card.Subtitle>
							<PatientTypesPie />
						</Card.Body>
                    </Card>

					<Card bg="light"border="secondary" style={cardItem}>
						<Card.Header><h5>Questionnaire Age Range</h5></Card.Header>
						<Card.Body>
						<Card.Subtitle className="mb-2 text-muted">Number of questionnaires directed towards different patient ages.</Card.Subtitle>
							<AgeRangeLine />
						</Card.Body>
                    </Card>
				</div>
				<Footer/>
			</div>
		)
	}
}

const cardRow = {
	paddingLeft: '5%', 
	paddingRight: '5%', 
	paddingTop: '10px', 
	display: 'flex',
	flexWrap: 'wrap',
}

const cardItem = {
	width: '40rem', 
	marginRight: '10px', 
	marginLeft:'10px', 
	marginBottom: '20px',
	textAlign: 'center'
}
export default Statistics

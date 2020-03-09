import React, { Component } from 'react';
import Footer from '../layout/Footer';
import { Card } from 'react-bootstrap';
import { Result } from 'antd';
import 'antd/dist/antd.css';


import PatientTypesPie from './PatientTypesPie';
import AgeRangeLine from './AgeRangeLine';
import KMeansAge from './KMeansAge';
import AveragePatientAge from './AveragePatientAge';

/* Ideas: 
1. Number of responses per month - Horizontal Bar
2. Responses chose for a certain question - Radar
3. Predictive charts using simple algorithms?
*/

export class Statistics extends Component {
	render() {
		return (
			<div>
				<Result
					title="Welcome to Statistics!"
					subTitle="You can view statistics on questionnaires and responses on this page."
					style={{backgroundColor: '#d8e5f3'}}
				/>

				<div style={cardRow}>
					<Card bg="light" border="secondary" style={cardItem}>
						<Card.Header><h5>Patient Type Proportions</h5></Card.Header>
						<Card.Body>
						<Card.Subtitle className="mb-2 text-muted">Ratio of questionnaires for different types of patients.</Card.Subtitle>
							<PatientTypesPie />
						</Card.Body>
                    </Card>

					<Card bg="light" border="secondary" style={cardItem}>
						<Card.Header><h5>Questionnaire Age Range</h5></Card.Header>
						<Card.Body>
						<Card.Subtitle className="mb-2 text-muted">Number of questionnaires that can be answered by different patient ages.</Card.Subtitle>
							<AgeRangeLine />
						</Card.Body>
                    </Card> 

					<Card bg="light" border="secondary" style={cardItem}>
						<Card.Header><h5>Questionnaire Age Range</h5></Card.Header>
						<Card.Body>
						<Card.Subtitle className="mb-2 text-muted">Number of questionnaires that can be answered by different patient ages.</Card.Subtitle>
							<KMeansAge />
						</Card.Body>
                    </Card>  


					<Card bg="light"border="secondary" style={cardItem}>
						<Card.Header><h5>Average Patient Age</h5></Card.Header>
						<Card.Body>
							<AveragePatientAge />
						</Card.Body>
                	</Card>
				</div>
				<Footer/>
			</div>
		)
	}
}

const cardRow = {
	paddingTop: '10px', 
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'center'
}

const cardItem = {
	width: '30rem', 
	marginRight: '10px', 
	marginLeft:'10px', 
	marginBottom: '20px',
	textAlign: 'center'
}

export default Statistics

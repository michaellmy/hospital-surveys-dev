import React, { Component } from 'react';
import { Doughnut, Line, Pie, Bar, Radar } from 'react-chartjs-2';
import Header from '../layout/Header';

/* Ideas: 
1. Number of responses per month - Horizontal Bar
2. Responses chose for a certain question - Radar
3. Predictive charts using simple algorithms?
*/

const data = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
	  {
		label: 'My First dataset',
		backgroundColor: 'rgb(51, 102, 255)',
		borderColor: 'rgb(0, 13, 51)',
		borderWidth: 1,
		hoverBackgroundColor: 'rgba(255,99,132,0.4)',
		hoverBorderColor: 'rgba(255,99,132,1)',
		data: [65, 59, 80, 81, 56, 55, 40]
	  }
	]
}

export class Statistics extends Component {
	render() {
		return (
			<div>
				<Header />
				<div style={{ paddingLeft: '5%', paddingRight: '10%' , paddingTop: '10px'}}>
					<h2>Welcome to Statistics!</h2>
					<Bar data={data} width={200} height={250} options={{maintainAspectRatio: false}} />
				</div>
				<hr></hr>
				<div style={{ paddingLeft: '5%', paddingRight: '10%' }}>
					<Pie data={data} width={300} height={300} options={{maintainAspectRatio: false}} />
				</div>
			</div>
		)
	}
}

export default Statistics

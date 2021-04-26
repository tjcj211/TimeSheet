import React, { Component } from 'react';
import { getProfessorClasses } from '../service/professorService';
import { Link } from 'react-router-dom';
class ClassesTable extends Component {
	state = {
		classes: [
			{
				lesson: [],
				_id: '606f9057ce745d49dc11c238',
				name: 'CSC111',
				class_code: '094-583',
				__v: 0,
			},
			{
				lesson: [
					{
						record: ['606f90cdce745d49dc11c23e'],
						_id: '606f909bce745d49dc11c23b',
						name: 'REST APIs',
						due_date: '2021-06-20T04:00:00.000Z',
						__v: 0,
					},
				],
				_id: '606f905bce745d49dc11c239',
				name: 'SER320',
				class_code: '056-763',
				__v: 0,
			},
		],
	};
	async componentDidMount() {
		const { data } = await getProfessorClasses(
			this.props.match.params.id
		);
		this.setState({ classes: data });
	}
	render() {
		return (
			<table className="table">
				<thead>
					<tr>
						<th>Class Name</th>
						<th>Class Code</th>
					</tr>
				</thead>
				<tbody>
					{this.state.classes.map((clas, index) => (
						<tr key={index}>
							<td>
								<Link
									to={`/${this.props.match.params.id}/classes/${clas._id}`}
								>
									{clas.name}
								</Link>
							</td>
							<td>{clas.class_code}</td>
							{/*Testing Purposes Only*/}
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

export default ClassesTable;

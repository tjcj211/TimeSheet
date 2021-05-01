/*
 * Timothy Carta, Victoria Gorski, Julia Wilkinson
 */
import React, { Component } from 'react';
import { getProfessorRecords } from '../service/professorService';
class RecordsTable extends Component {
	state = {
		records: [],
	};
	async componentDidMount() {
		const { professorId, classId, lessonId } = this.props;
		const { data } = await getProfessorRecords(
			professorId,
			classId,
			lessonId
		);
		this.setState({ records: data });
	}
	render() {
		return (
			<table className="table">
				<thead>
					<tr>
						<th>Record Name</th>
						<th>Minutes Taken</th>
					</tr>
				</thead>
				<tbody>
					{this.state.records.map((record, index) => (
						<tr key={index}>
							<td>{record.type}</td>
							<td>{record.minutes}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

export default RecordsTable;

import React, { Component } from 'react';
import { getRecords } from '../service/professorService';
class LessonsTable extends Component {
	state = {
		records: [
			{
				type: 'HOMEWORK',
				_id: '606f90cdce745d49dc11c23e',
				minutes: 10,
				__v: 0,
			},
		],
	};
	async componentDidMount() {
		const { professorId, classId, lessonId } = this.props;
		const { data } = await getProfessorRecords(
			professorId,
			classId,
			lessonId
		);
		this.setState({ record: data });
	}
	render() {
		const { lesson } = this.props;
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

export default LessonsTable;

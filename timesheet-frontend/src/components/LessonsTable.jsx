import React, { Component } from 'react';
import { getProfessorLessons } from '../service/professorService';
import RecordsTable from './RecordsTable';
class LessonsTable extends Component {
	state = {
		lesson: [
			{
				record: ['606f90cdce745d49dc11c23e'],
				_id: '606f909bce745d49dc11c23b',
				name: 'REST APIs',
				due_date: '2021-06-20',
				__v: 0,
			},
		],
	};
	async componentDidMount() {
		const { data } = await getProfessorLessons(
			this.props.match.params.id,
			this.props.match.params.classId
		);
		this.setState({ lesson: data });
	}
	render() {
		return (
			<table className="table">
				{/* {this.props.match.params.classId} */}
				<thead>
					<tr>
						<th>Lesson Name</th>
						<th>Due Date</th>
					</tr>
				</thead>
				<tbody>
					{this.state.lesson.map((lesson, index) => (
						<React.Fragment>
							<tr key={index}>
								<td>{lesson.name}</td>
								<td>{lesson.due_date}</td>
							</tr>
							<tr className="text-center">
								<RecordsTable lesson={lesson._id} />
							</tr>
						</React.Fragment>
					))}
				</tbody>
			</table>
		);
	}
}

export default LessonsTable;

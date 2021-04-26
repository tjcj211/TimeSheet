import React, { Component } from 'react';
import { getProfessorLessons } from '../service/professorService';
import RecordsTable from './RecordsTable';
class LessonsTable extends Component {
	state = {
		lessons: [],
	};
	async componentDidMount() {
		//TODO: add conditional for professor/student
		const { data } = await getProfessorLessons(
			this.props.match.params.id,
			this.props.match.params.classId
		);
		this.setState({ lessons: data });
	}
	render() {
		return (
			<table className="table">
				<thead>
					<tr>
						<th>Lesson Name</th>
						<th>Due Date</th>
					</tr>
				</thead>
				<tbody>
					{this.state.lessons.map((lesson, index) => (
						<React.Fragment>
							<tr key={index}>
								<td>{lesson.name}</td>
								<td>{lesson.due_date}</td>
							</tr>
							<tr className="text-center">
								{/*TODO: Conditional rendering for Professor*/}
								<RecordsTable
									professorId={
										this.props.match.params.id
									}
									classId={
										this.props.match.params
											.classId
									}
									lessonId={lesson._id}
								/>
								{/*TODO: Conditional rendering for Student*/}
							</tr>
						</React.Fragment>
					))}
				</tbody>
			</table>
		);
	}
}

export default LessonsTable;

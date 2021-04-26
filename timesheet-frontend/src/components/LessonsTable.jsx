import React, { Component } from 'react';
import { getProfessorLessons, saveLesson } from '../service/professorService';
import CreateLessonForm from './CreateLessonForm';
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

	handleAddLesson = async (lesson_name, due_date) => {
		const obj = {
			name: lesson_name,
			record: [],
			due_date: due_date,
		};
		const { data: lesson } = await saveLesson(
			this.props.match.params.id,
			this.props.match.params.classId,
			obj
		);
		const lessons = [lesson, ...this.state.lessons];
		this.setState({ lessons });
	};

	render() {
		return (
			<React.Fragment>
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
									{lesson.record &&
										lesson.record.length !==
											0 && (
											<RecordsTable
												professorId={
													this.props
														.match
														.params.id
												}
												classId={
													this.props
														.match
														.params
														.classId
												}
												lessonId={
													lesson._id
												}
											/>
										)}
									{/*TODO: Conditional rendering for Student*/}
								</tr>
							</React.Fragment>
						))}
					</tbody>
				</table>
				<CreateLessonForm handleAddLesson={this.handleAddLesson} />
			</React.Fragment>
		);
	}
}

export default LessonsTable;

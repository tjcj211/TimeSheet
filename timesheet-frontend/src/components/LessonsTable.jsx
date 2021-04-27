import React, { Component } from 'react';
import { getProfessorLessons, saveLesson } from '../service/professorService';
import { getStudentLessons } from '../service/studentService';
import { getAccount } from '../service/accountService';
import CreateLessonForm from './CreateLessonForm';
import RecordsTable from './RecordsTable';
class LessonsTable extends Component {
	constructor(props) {
		super(props);
		this.handleAddLesson = this.handleAddLesson.bind(this);
	}
	state = {
		lessons: [],
		account: {},
	};
	async componentDidMount() {
		const { data: account } = await getAccount(
			this.props.match.params.id
		);
		this.setState({ account });

		switch (account.account_type) {
			case 'PROFESSOR':
				const {
					data: professorLessons,
				} = await getProfessorLessons(
					this.props.match.params.id,
					this.props.match.params.classId
				);
				this.setState({ lessons: professorLessons });
				break;

			case 'STUDENT':
				const { data: studentLessons } = await getStudentLessons(
					this.props.match.params.id,
					this.props.match.params.classId
				);
				this.setState({ lessons: studentLessons });
				break;
			default:
				break;
		}
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
		const accountType = this.state.account.account_type;
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
									{/*Conditional Render - If account is a Professor/Student*/}
									<div>
										{accountType === 'PROFESSOR'
											? lesson.record &&
											  lesson.record
													.length !==
													0 && (
													<RecordsTable
														professorId={
															this
																.props
																.match
																.params
																.id
														}
														classId={
															this
																.props
																.match
																.params
																.classId
														}
														lessonId={
															lesson._id
														}
													/>
											  )
											: null}
									</div>

									{/*TODO: Conditional rendering for Student*/}
								</tr>
							</React.Fragment>
						))}
					</tbody>
				</table>
				<div>
					{accountType === 'PROFESSOR' ? (
						<CreateLessonForm
							handleAddLesson={this.handleAddLesson}
						/>
					) : null}
				</div>
			</React.Fragment>
		);
	}
}

export default LessonsTable;

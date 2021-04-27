import React, { Component } from 'react';
import { getProfessorClasses, saveClass } from '../service/professorService';
import { getStudentClasses } from '../service/studentService';
import { getAccount } from '../service/accountService';
import CreateClassForm from './CreateClassForm';
import { Link } from 'react-router-dom';
class ClassesTable extends Component {
	constructor(props) {
		super(props);
		this.handleAddClass = this.handleAddClass.bind(this);
	}
	state = {
		classes: [],
		account: {},
	};

	async componentDidMount() {
		//TODO: add conditional for professor/student
		const { data: account } = await getAccount(
			this.props.match.params.id
		);
		this.setState({ account });

		switch (account.account_type) {
			case 'PROFESSOR':
				const {
					data: professorClasses,
				} = await getProfessorClasses(this.props.match.params.id);
				this.setState({ classes: professorClasses });
				break;

			case 'STUDENT':
				const { data: studentClasses } = await getStudentClasses(
					this.props.match.params.id
				);
				this.setState({ classes: studentClasses });
				break;

			default:
				break;
		}
	}

	handleAddClass = async (class_name) => {
		var randomClassCode =
			Math.floor(Math.random() * 100000) +
			'-' +
			Math.floor(Math.random() * 100000);
		const obj = {
			name: class_name,
			lesson: [],
			class_code: randomClassCode,
		};
		const { data: clas } = await saveClass(
			this.props.match.params.id,
			obj
		);
		const classes = [clas, ...this.state.classes];
		this.setState({ classes });
	};

	render() {
		const accountType = this.state.account.account_type;
		return (
			<React.Fragment>
				<table className="table">
					<thead>
						<tr>
							<th>Class Name</th>
							{/*Conditional Render - If account is a Professor/Student*/}
							<div>
								{accountType === 'PROFESSOR' ? (
									<th>Class Code</th>
								) : (
									''
								)}
							</div>
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
								{/*Conditional Render - If account is a Professor/Student*/}
								<div>
									{accountType === 'PROFESSOR' ? (
										<td>{clas.class_code}</td>
									) : (
										''
									)}
								</div>
							</tr>
						))}
					</tbody>
				</table>

				{/*Conditional Render - If account is a Professor/Student*/}
				<div>
					{accountType === 'PROFESSOR' ? (
						<CreateClassForm
							handleAddClass={this.handleAddClass}
						/>
					) : (
						'DEBUG: STUDENT JOIN CLASS'
					)}
				</div>
			</React.Fragment>
		);
	}
}

export default ClassesTable;

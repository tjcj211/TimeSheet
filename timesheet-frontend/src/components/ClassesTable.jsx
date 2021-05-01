/*
 * Timothy Carta, Victoria Gorski, Julia Wilkinson
 */
import React, { Component } from 'react';
import { getProfessorClasses, saveClass } from '../service/professorService';
import { getStudentClasses, addClass } from '../service/studentService';
import { getAccount } from '../service/accountService';
import { getClass } from '../service/classService';
import CreateClassForm from './CreateClassForm';
import JoinClassForm from './JoinClassForm';
import { Link } from 'react-router-dom';
class ClassesTable extends Component {
	constructor(props) {
		super(props);
		//console.log("account with props = " + this.props.account);
		this.handleAddClass = this.handleAddClass.bind(this);
		this.state = {
			classes: [],
			account: props.account,
		};
	}

	async componentDidMount() {
		/* const { account } = this.state.account;
    console.log("state account : " + this.state.account); */

		const { data: account } = await getAccount(this.state.account._id);

		//this.setState({ account });
		this.setState({ account });
		//console.log("account type " + this.state.account.account_type);
		//console.log("props account = " + this.props.account);

		//console.log("data" + account);

		//console.log("set state account: " + account);

		switch (this.state.account.account_type) {
			case 'PROFESSOR':
				console.log(
					'case supposed to be professor: ' +
						this.state.account.account_type
				);
				console.log(this.props.account._id);
				const {
					classes: professorClasses,
				} = await getProfessorClasses(this.props.account._id);
				this.setState({ professorClasses });
				//console.log("professorclasses" + professorClasses);

				break;

			case 'STUDENT':
				console.log(
					'case supposed to be student: ' +
						this.state.account.account_type
				);
				console.log('the account id' + this.props.account._id);
				const { classes: studentClasses } = await getStudentClasses(
					this.props.account._id
				);
				this.setState({ studentClasses });
				console.log('set state professor classes');
				break;

			default:
				break;
		}
	}

	handleAddClass = async (class_name) => {
		console.log('handle add class');
		var randomClassCode =
			Math.floor(Math.random() * 100000) +
			'-' +
			Math.floor(Math.random() * 100000);
		const obj = {
			name: class_name,
			lesson: [],
			class_code: randomClassCode,
		};
		const { data: clas } = await saveClass(this.props.account._id, obj);
		console.log('await save class');
		const classes = [clas.result, ...this.state.classes];
		this.setState({ classes });
		console.log('this.setstate classes');
	};

	handleJoinClass = async (class_code) => {
		console.log('handle join class');
		const { data: clas } = await getClass(class_code);
		await addClass(this.props.account._id, clas);
		const classes = [clas[0], ...this.state.classes];
		this.setState({ classes });
	};

	render() {
		const accountType = this.state.account.account_type;
		console.log('account type render: ' + accountType);
		console.log('state classes' + this.state.account.class);

		return (
			<React.Fragment>
				<table className="table">
					<thead>
						<tr>
							<th>Class Name</th>
							{/*Conditional Render - If account is a Professor/Student*/}

							{accountType === 'PROFESSOR' ? (
								<th>Class Code</th>
							) : null}
						</tr>
					</thead>
					<tbody>
						{this.state.classes.map((clas, index) => (
							<tr key={index}>
								<td>
									<Link
										to={`/${this.state.account._id}/classes/${clas._id}`}
									>
										{clas.name}
									</Link>
								</td>
								{/*Conditional Render - If account is a Professor/Student*/}

								{accountType === 'PROFESSOR' ? (
									<td>{clas.class_code}</td>
								) : null}
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
						<JoinClassForm
							handleJoinClass={this.handleJoinClass}
						/>
					)}
				</div>
			</React.Fragment>
		);
	}
}

export default ClassesTable;

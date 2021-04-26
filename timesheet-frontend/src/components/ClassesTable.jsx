import React, { Component } from 'react';
import { getProfessorClasses, saveClass } from '../service/professorService';
import CreateClassForm from './CreateClassForm';
import { Link } from 'react-router-dom';
class ClassesTable extends Component {
	state = {
		classes: [],
	};
	async componentDidMount() {
		//TODO: add conditional for professor/student
		const { data } = await getProfessorClasses(
			this.props.match.params.id
		);
		this.setState({ classes: data });
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
		return (
			<React.Fragment>
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
							</tr>
						))}
					</tbody>
				</table>
				<CreateClassForm handleAddClass={this.handleAddClass} />
			</React.Fragment>
		);
	}
}

export default ClassesTable;

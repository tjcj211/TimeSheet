import React, { Component } from 'react';
import { getProfessorClasses } from '../service/professorService';
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
		console.log(data);
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

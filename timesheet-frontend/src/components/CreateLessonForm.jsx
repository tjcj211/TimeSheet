import React, { Component } from 'react';
class CreateLessonForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lesson_name: '',
			due_date: '',
		};
	}

	handleChangeName = (event) => {
		this.setState({ lesson_name: event.target.value });
	};

	handleChangeDate = (event) => {
		this.setState({ due_date: event.target.value });
	};

	render() {
		return (
			<React.Fragment>
				<div className="row">
					<div className="col">
						<input
							type="text"
							className="form-control"
							name="search"
							placeholder="Lesson Name"
							onChange={this.handleChangeName}
							value={this.state.class_name}
						/>
					</div>
					{/* <div className="col">
						<input
							type="text"
							className="form-control"
							name="search"
							placeholder="Due Date: MM/DD/YYYY"
							onChange={this.handleChangeDate}
							value={this.state.class_name}
						/>
					</div> */}
					<div className="col">
						<button
							className="btn btn-primary"
							onClick={() => {
								this.props.handleAddLesson(
									this.state.lesson_name,
									this.state.due_date
								);
							}}
						>
							Create Lessons
						</button>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default CreateLessonForm;

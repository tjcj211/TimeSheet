import React, { Component } from 'react';
class CreateLessonForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			record_type: 'HOMEWORK',
			minutes: '',
		};
	}

	handleChangeRecordType = (event) => {
		this.setState({ record_type: event.target.value });
	};

	handleChangeMinutes = (event) => {
		this.setState({ minutes: event.target.value });
	};

	render() {
		const lesson = this.props.lesson;
		return (
			<React.Fragment>
				<div className="row">
					<div className="col">
						<select
							value={this.state.record_type}
							onChange={this.handleChangeRecordType}
						>
							<option>HOMEWORK</option>
							<option>STUDYING</option>
							<option>EXAM PREP</option>
						</select>
					</div>
					<div className="col">
						<input
							type="text"
							className="form-control"
							placeholder="Minutes Spent"
							onChange={this.handleChangeMinutes}
							value={this.state.minutes}
						/>
					</div>
					<div className="col">
						<button
							className="btn btn-primary"
							onClick={() => {
								this.props.handleAddRecord(
									this.state.record_type,
									this.state.minutes,
									lesson
								);
								this.setState({
									record_type: '',
									minutes: '',
								});
							}}
						>
							Submit Record
						</button>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default CreateLessonForm;

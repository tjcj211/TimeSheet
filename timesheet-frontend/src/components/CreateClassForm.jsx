import React, { Component } from 'react';
class CreateClassForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			class_name: '',
		};
	}

	handleChangeName = (event) => {
		this.setState({ class_name: event.target.value });
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
							placeholder="Class Name"
							onChange={this.handleChangeName}
							value={this.state.class_name}
						/>
					</div>
					<div className="col">
						<button
							className="btn btn-primary"
							onClick={() => {
								this.props.handleAddClass(
									this.state.class_name,
									this.state.class_code
								);
								this.setState({
									class_name: '',
									class_code: '',
								});
							}}
						>
							Create Class
						</button>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default CreateClassForm;

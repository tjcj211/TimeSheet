/*
 * Timothy Carta, Victoria Gorski, Julia Wilkinson
 */
import React, { Component } from 'react';
class CreateClassForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			class_code: '',
		};
		this.handleChangeCode = this.handleChangeCode.bind(this);
	}

	handleChangeCode = (event) => {
		this.setState({ class_code: event.target.value });
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
							placeholder="Class Code"
							onChange={this.handleChangeCode}
							value={this.state.class_code}
						/>
					</div>
					<div className="col">
						<button
							className="btn btn-primary"
							onClick={() => {
								this.props.handleJoinClass(
									this.state.class_code
								);
								this.setState({
									class_code: '',
								});
							}}
						>
							Join Class
						</button>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default CreateClassForm;

import React, { Component } from "react";
import { getProfessorLessons } from "../service/professorService";
import RecordsTable from "./RecordsTable";
import { getStudentLessons } from "../service/studentService";

class LessonsTable extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    time: "",
    value: "",
    lessons: [],
  };
  handleChange(event) {
    this.setState({ value: event.target.value });
    this.setState({ time: event.target.time });
  }
  handleSubmit(event) {
    alert("A lesson was submitted: " + this.state.value + this.state.time);

    event.preventDefault();
  }
  async componentDidMount() {
    //TODO: add conditional for professor/student
    const { data } = await getProfessorLessons(
      this.props.match.params.id,
      this.props.match.params.classId
    );
    this.setState({ lessons: data });
  }

  render() {
    if (false) {
      return (
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
                  <RecordsTable
                    professorId={this.props.match.params.id}
                    classId={this.props.match.params.classId}
                    lessonId={lesson._id}
                  />
                  {/*TODO: Conditional rendering for Student*/}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      );
    } else {
      return (
        <React.Fragment>
          <form onSubmit={this.handleSubmit}>
            <label>
              <div>
                <h2>Enter Time</h2>
              </div>
              <div>
                {this.state.lessons.map((lesson, index, arr) => (
                  <div>
                    <label>{lesson.name}</label>
                  </div>
                ))}
                <div>
                  <h4>Select Type and Enter Time</h4>
                </div>
                <div>
                  <select value={this.state.value} onChange={this.handleChange}>
                    <option>Homework</option>
                    <option>Studying</option>
                    <option>Exam Prep</option>
                  </select>
                  <div></div>
                  <input
                    type="text"
                    placeholder="Time (minutes)"
                    value={this.state.time}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div>
                <input type="submit" value="Submit" />
              </div>
            </label>
          </form>
        </React.Fragment>
      );
    }
  }
}

export default LessonsTable;

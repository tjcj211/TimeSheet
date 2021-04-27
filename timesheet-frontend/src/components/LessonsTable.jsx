import React, { Component } from "react";
import { getProfessorLessons, saveLesson } from "../service/professorService";
import {
  getStudentLessons,
  getStudentRecords,
} from "../service/studentService";
import { getAccount } from "../service/accountService";
import CreateLessonForm from "./CreateLessonForm";
import RecordsTable from "./RecordsTable";
class LessonsTable extends Component {
  constructor(props) {
    super(props);
    this.handleAddLesson = this.handleAddLesson.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    lessons: [],
    account: {},
  };
  handleChange (event) {
	const { inputtime: record } = await saveRecord(
		this.props.match.params.id,
		this.props.match.params.classId,
		this.props.match.params.lessonId,
	)
	console.log(record.result);
	const records = [record.result, ...this.state.lessons];
	this.setState({ inputtime: event.target.inputtime });
	
  }
 

  handleSubmit(event) {
    alert("A lesson was submitted: " + this.state.value + this.state.inputtime);

    event.preventDefault();
  }

  async componentDidMount() {
    //using this to get the records of the student for each lesson

    const { data: account } = await getAccount(this.props.match.params.id);
    this.setState({ account });

    switch (account.account_type) {
      case "PROFESSOR":
        const { data: professorLessons } = await getProfessorLessons(
          this.props.match.params.id,
          this.props.match.params.classId
        );
        this.setState({ lessons: professorLessons });
        break;

      case "STUDENT":
        const { data: studentLessons } = await getStudentLessons(
          this.props.match.params.id,
          this.props.match.params.classId
        );
        console.log("student lessons: " + studentLessons);
        this.setState({ lessons: studentLessons });
        console.log("student lessons: " + this.state.lessons);

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
    console.log(lesson.result);
    const lessons = [lesson.result, ...this.state.lessons];
    this.setState({ lessons });
  };

  render() {
    const accountType = this.state.account.account_type;
    //const minutes = this.state.records.minutes;
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
            {this.state.lessons.reverse().map((lesson, index, arr) => (
              <React.Fragment>
                <tr key={index}>
                  <td>{lesson.name}</td>
                  <td>{lesson.due_date}</td>
                </tr>
                <tr className="text-center">
                  {/*Conditional Render - If account is a Professor/Student*/}
                  <div>
                    {accountType === "PROFESSOR" ? (
                      lesson.record &&
                      lesson.record.length !== 0 && (
                        <RecordsTable
                          professorId={this.props.match.params.id}
                          classId={this.props.match.params.classId}
                          lessonId={lesson._id}
                        />
                      )
                    ) : (
                      <React.Fragment>
                        <form onSubmit={this.handleSubmit}>
                          <label>
                            <div>
                              <div>
                                <h5>Select Type and Enter Time</h5>
                              </div>
                              <div>
                                <select
                                  value={this.state.value}
                                  onChange={this.handleChange}
                                >
                                  <option>Homework</option>
                                  <option>Studying</option>
                                  <option>Exam Prep</option>
                                </select>
                                <div></div>
                                {lesson.record == 0 ? (
                                  <input
                                    type="text"
                                    placeholder="mins"
                                    value={this.state.inputtime}
                                    onChange={this.handleChange}
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    placeholder="mins"
                                    value={this.state.inputtime}
                                    onChange={this.handleChange}
                                    disabled="true"
                                  />
                                )}
                              </div>
                            </div>
                            <div>
                              <input type="submit" value="Submit" />
                            </div>
                          </label>
                        </form>
                      </React.Fragment>
                    )}
                  </div>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div>
          {accountType === "PROFESSOR" ? (
            <CreateLessonForm handleAddLesson={this.handleAddLesson} />
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default LessonsTable;

import React, { Component } from "react";
import { getProfessorClasses, saveClass } from "../service/professorService";
import { getStudentClasses, addClass } from "../service/studentService";
import { getAccount } from "../service/accountService";
import { getClass } from "../service/classService";
import CreateClassForm from "./CreateClassForm";
import JoinClassForm from "./JoinClassForm";
import { Link } from "react-router-dom";
class ClassesTable extends Component {
  constructor(props) {
    super(props);
    console.log("account = " + this.props.account);
    this.handleAddClass = this.handleAddClass.bind(this);
  }
  state = {
    classes: [],
    account: {},
  };

  async componentDidMount() {
    const { account } = this.props;
    console.log("props = " + this.props.account);
    this.setState({ account });

    switch (this.state.account.account_type) {
      case "PROFESSOR":
        const { professorClasses } = await getProfessorClasses(
          this.props.match.params.id
        );
        this.setState({ classes: professorClasses });
        break;

      case "STUDENT":
        const { studentClasses } = await getStudentClasses(
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
      "-" +
      Math.floor(Math.random() * 100000);
    const obj = {
      name: class_name,
      lesson: [],
      class_code: randomClassCode,
    };
    const { data: clas } = await saveClass(this.props.match.params.id, obj);
    const classes = [clas.result, ...this.state.classes];
    this.setState({ classes });
  };

  handleJoinClass = async (class_code) => {
    const { data: clas } = await getClass(class_code);
    await addClass(this.state.account._id, clas);
    const classes = [clas[0], ...this.state.classes];
    this.setState({ classes });
  };

  render() {
    const accountType = this.props.match.params.account_type;
    return (
      <React.Fragment>
        <table className="table">
          <thead>
            <tr>
              <th>Class Name</th>
              {/*Conditional Render - If account is a Professor/Student*/}
              <div>
                {accountType === "PROFESSOR" ? <th>Class Code</th> : null}
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
                  {accountType === "PROFESSOR" ? (
                    <td>{clas.class_code}</td>
                  ) : null}
                </div>
              </tr>
            ))}
          </tbody>
        </table>

        {/*Conditional Render - If account is a Professor/Student*/}
        <div>
          {accountType === "PROFESSOR" ? (
            <CreateClassForm handleAddClass={this.handleAddClass} />
          ) : (
            <JoinClassForm handleJoinClass={this.handleJoinClass} />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default ClassesTable;

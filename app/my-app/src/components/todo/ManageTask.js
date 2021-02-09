import React from "react";
import { connect } from "react-redux";
import * as taskActions from "../../redux/actions/taskActions";
import * as subtaskActions from "../../redux/actions/subtaskActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import Subtask from "./Subtask.js";
import DropdownInput from "../common/DropdownInput.js";

class ManageTask extends React.Component {
  state = {
    subtask: {
      description: "",
    },
  };

  handleSubtaskChange = async (event) => {
    event.preventDefault();
    const subtask = { ...this.subtask, description: event.target.value };
    this.setState({ subtask: subtask });
  };

  handleDelete = (event) => {
    event.preventDefault();
    this.props.actions.deleteTask(this.props.task);
    this.props.history.push("/ToDo");
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    await this.props.actions.saveSubtask(
      this.state.subtask,
      this.props.task.id
    );

    console.log(this.props.subtasks);
    this.setState({ subtask: { description: "" } });
  };

  async componentDidMount() {
    await this.props.actions.loadSubtasks(this.props.task.id);
  }

  render() {
    return (
      <>
        <DropdownInput
          handleSubmit={this.handleSubmit}
          handleChange={this.handleSubtaskChange}
          handleDelete={this.handleDelete}
          value={this.state.subtask.description}
          placeholder="Enter a subtask"
          title="Subtask"
        />

        <div className="jumbotron jumbotron-fluid gradient-h text-light fade-in m-0">
          <div className="container">
            <div className="d-flex justify-content-between">
              <div>
                <h2 className="display-4">Task</h2>
              </div>
              <div>
                <Link to={"/ToDo"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="white"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="row">
              <div className="col-7 m-0">
                <p className="lead">{this.props.task.description}</p>
              </div>
              <div className="col-2 ">
                <div className="dropdown d-flex">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Status
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a
                      className="dropdown-item pointer"
                      onClick={() =>
                        this.props.actions.updateStatus(this.props.task, "NS")
                      }
                    >
                      Not Started
                    </a>
                    <a
                      className="dropdown-item pointer"
                      onClick={() =>
                        this.props.actions.updateStatus(this.props.task, "IP")
                      }
                    >
                      In Progress
                    </a>
                    <a
                      className="dropdown-item pointer"
                      onClick={() =>
                        this.props.actions.updateStatus(this.props.task, "C")
                      }
                    >
                      Complete
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12">
                <h1 className="display-4">Subtasks</h1>
                {this.props.subtasks &&
                  this.props.subtasks.map(
                    (subtask) =>
                      subtask.task_id == this.props.task.id && (
                        <Subtask
                          handleClick={() => {
                            this.props.actions.deleteSubtask(subtask);
                          }}
                          subtask={subtask}
                          key={subtask.id}
                        />
                      )
                  )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

ManageTask.propTypes = {
  actions: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  subtasks: PropTypes.array.isRequired,
};

function mapStateToProps(state, props) {
  return {
    subtasks: state.subtasks,
    task: state.tasks.active,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { ...taskActions, ...subtaskActions },
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTask);

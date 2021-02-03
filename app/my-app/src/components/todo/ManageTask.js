import React from "react";
import { connect } from "react-redux";
import * as taskActions from "../../redux/actions/taskActions";
import * as subtaskActions from "../../redux/actions/subtaskActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import Subtask from "./Subtask.js";

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

  handleSubmit = async (event) => {
    event.preventDefault();

    await this.props.actions.saveSubtask(
      this.state.subtask,
      this.props.task.id
    );
    this.setState({ subtask: { description: "" } });
  };

  async componentDidMount() {
    await this.props.actions.loadTasks();
    await this.props.actions.loadSubtasks(this.props.match.params.id);
  }

  render() {
    console.log("render");
    return (
      <>
        <div className="jumbotron jumbotron-fluid m-0 p-0">
          <div className="container collapse" id="collapser">
            <p className="lead pt-4 mb-0">Add subtasks</p>
            <form onSubmit={this.handleSubmit}>
              <div className="input-group mb-3">
                <input
                  className="form-control "
                  placeholder="Enter a subtask"
                  onChange={this.handleSubtaskChange}
                  value={this.state.subtask.description}
                />
                <div className="input-group-append">
                  <button className="btn btn-secondary" type="submit">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
          <button
            className="btn btn-link m-0 pb-1"
            type="button"
            data-toggle="collapse"
            data-target="#collapser"
            aria-expanded="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="black"
              className="bi bi-arrows-expand"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zM7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10z"
              />
            </svg>
          </button>
        </div>

        <div className="jumbotron jumbotron-fluid gradient-h text-light fade-in">
          <div className="container">
            <div className="row">
              <div className="col-4">
                <h2 className="display-4">Task</h2>
              </div>
              <div className="col-1 offset-7">
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
                {this.props.subtasks.length > 0 &&
                  this.props.subtasks.map(
                    (subtask) =>
                      subtask.task_id == this.props.match.params.id && (
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
  tasks: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  subtasks: PropTypes.array.isRequired,
};

function mapStateToProps(state, props) {
  return {
    tasks: state.tasks,
    subtasks: state.subtasks,
    task: state.tasks.find((task) => task.id === props.match.params.id) || {},
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

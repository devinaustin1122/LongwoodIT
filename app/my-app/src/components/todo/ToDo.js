import React from "react";
import { connect } from "react-redux";
import * as taskActions from "../../redux/actions/taskActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Task from "./Task.js";

class ToDo extends React.Component {
  state = {
    task: {
      description: "",
    },
    loaded: false,
  };

  componentDidMount() {
    this.props.actions.loadTasks();
  }

  handleChange = (event) => {
    const task = { ...this.state.task, description: event.target.value };
    this.setState({ task: task });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.actions.saveTask(this.state.task);
    this.setState({ task: { description: "" } });
  };

  render() {
    return (
      <div className="fade-in">
        <div className="jumbotron jumbotron-fluid m-0 p-0">
          <div className="container collapse" id="collapser">
            <div className="container ">
              <h1 className="display-4 m-0 pt-3">ToDo</h1>
            </div>
            <p className="lead">Manage your week with tasks and subtasks</p>
            <form onSubmit={this.handleSubmit}>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  placeholder="Enter a task"
                  onChange={this.handleChange}
                  value={this.state.task.description}
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

        <div className="countainer-fluid p-5 text-light gradient-h">
          <h1 className="display-4">Not Started</h1>
          {this.props.tasks.map(
            (task) =>
              task.status === "NS" && (
                <Task
                  key={task.id}
                  task={task}
                  handleClick={(task) => this.props.actions.deleteTask(task)}
                />
              )
          )}
          <h1 className="display-4">In Progress</h1>
          {this.props.tasks.map(
            (task) =>
              task.status === "IP" && (
                <Task
                  key={task.id}
                  task={task}
                  handleClick={(task) => this.props.actions.deleteTask(task)}
                />
              )
          )}
          <h1 className="display-4">Complete</h1>
          {this.props.tasks.map(
            (task) =>
              task.status === "C" && (
                <Task
                  key={task.id}
                  task={task}
                  handleClick={(task) => this.props.actions.deleteTask(task)}
                />
              )
          )}
        </div>
      </div>
    );
  }
}

ToDo.propTypes = {
  tasks: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(taskActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
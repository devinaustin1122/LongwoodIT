import React from "react";
import { connect } from "react-redux";
import * as taskActions from "../../redux/actions/taskActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Task from "./Task.js";
import DropdownInput from "../common/DropdownInput";

class ToDo extends React.Component {
  state = {
    task: {
      description: "",
    },
    loaded: false,
  };

  async componentDidMount() {
    await this.props.actions.loadTasks(this.props.list.id);
    console.log(this.props.tasks);
  }

  handleChange = (event) => {
    event.preventDefault();
    const task = { ...this.state.task, description: event.target.value };
    this.setState({ task: task });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.actions.saveTask(this.state.task, this.props.list);
    this.setState({ task: { description: "" } });
  };

  handleTaskClick = async (task) => {
    await this.props.actions.selectTask(task);
    this.props.history.push("/Manage");
  };

  render() {
    return (
      <>
        <DropdownInput
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          value={this.state.task.description}
          title={this.props.list.name}
          comment="Manage your week with tasks and subtasks"
          to="/File"
        />

        <div className="countainer-fluid p-5 text-light gradient-h fade-in">
          <h1 className="display-4">Not Started</h1>
          {this.props.tasks.map(
            (task) =>
              task.status === "NS" && (
                <Task
                  key={task.id}
                  task={task}
                  handleClick={this.handleTaskClick}
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
                  handleClick={this.handleTaskClick}
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
                  handleClick={this.handleTaskClick}
                />
              )
          )}
        </div>
      </>
    );
  }
}

ToDo.propTypes = {
  tasks: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    tasks: state.tasks.all,
    list: state.lists.active,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(taskActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);

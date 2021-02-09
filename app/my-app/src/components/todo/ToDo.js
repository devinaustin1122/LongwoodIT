import React from "react";
import { connect } from "react-redux";
import * as taskActions from "../../redux/actions/taskActions";
import * as listActions from "../../redux/actions/listActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Task from "./Task.js";
import DropdownInput from "../common/DropdownInput";
import { store } from "react-notifications-component";

class ToDo extends React.Component {
  state = {
    task: {
      description: "",
    },
    loaded: false,
    dropdownState: "show",
  };

  async componentDidMount() {
    await this.props.actions.loadTasks(this.props.list.id);
    this.setState({ loaded: true });
  }

  notificationTest = () => {
    store.addNotification({
      title: "Success",
      message: "Task added",
      type: "success", // 'default', 'success', 'info', 'warning'
      container: "top-right", // where to position the notifications
      animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
      animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
      dismiss: {
        duration: 3000,
      },
    });
  };

  handleChange = (event) => {
    event.preventDefault();
    const task = { ...this.state.task, description: event.target.value };
    this.setState({ task: task });
  };

  handleDelete = () => {
    this.props.actions.deleteList(this.props.list.id, this.props.user);
    this.props.history.push("/File");
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.actions.saveTask(this.state.task, this.props.list);
    this.setState({ task: { description: "" } });
    store.addNotification({
      title: "Success",
      message: "Task added",
      type: "success", // 'default', 'success', 'info', 'warning'
      container: "top-right", // where to position the notifications
      animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
      animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
      dismiss: {
        duration: 3000,
      },
    });
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
          handleDelete={this.handleDelete}
          value={this.state.task.description}
          title={this.props.list.name}
          placeholder="Enter a task"
          comment="Manage your week with tasks and subtasks"
          to="/File"
        />
        <div className="text-light gradient-h fade-in p-5">
          {this.props.tasks.NS[0] !== undefined && (
            <h1 className="display-4">Not Started</h1>
          )}
          {this.props.tasks.NS[0] !== undefined &&
            this.props.tasks.NS.map((task) => (
              <Task
                key={task.id}
                task={task}
                handleClick={this.handleTaskClick}
              />
            ))}
          {this.props.tasks.IP[0] !== undefined && (
            <h1 className="display-4">In Progress</h1>
          )}
          {this.props.tasks.IP[0] !== undefined &&
            this.props.tasks.IP.map((task) => (
              <Task
                key={task.id}
                task={task}
                handleClick={this.handleTaskClick}
              />
            ))}
          {this.props.tasks.C[0] !== undefined && (
            <h1 className="display-4">Complete</h1>
          )}
          {this.props.tasks.C[0] !== undefined &&
            this.props.tasks.C.map((task) => (
              <Task
                key={task.id}
                task={task}
                handleClick={this.handleTaskClick}
              />
            ))}
        </div>
        )
      </>
    );
  }
}

ToDo.propTypes = {
  tasks: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    tasks: state.tasks.all,
    list: state.lists.active,
    user: state.users.active,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...taskActions, ...listActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);

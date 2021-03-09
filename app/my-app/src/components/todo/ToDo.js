import React from "react";
import { connect } from "react-redux";
import * as taskActions from "../../redux/actions/taskActions";
import * as listActions from "../../redux/actions/listActions";
import * as categoryActions from "../../redux/actions/categoryActions";

import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import DropdownHeader from "../common/DropdownHeader";
import { store } from "react-notifications-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import EditCategoryModal from "./modals/EditCategoryModal";
import EditTaskModal from "./modals/EditTaskModal";

class ToDo extends React.Component {
  state = {
    task: {
      description: "",
    },
    loaded: false,
    dropdownState: "show",
  };

  async componentDidMount() {
    await this.props.actions.loadCategories(this.props.list.id);
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
    this.props.actions.unselectList();
    this.props.history.push("/File");
  };

  handleTaskCreate = async () => {
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
        <DropdownHeader
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handleDelete={this.handleDelete}
          value={this.state.task.description}
          title={this.props.list.name}
          placeholder="Enter a task"
          comment={this.props.list.description}
          to="/File"
        />
        <div className="text-light gradient-h p-5">
          {this.props.categories.map((category) => {
            return (
              <div key={category.id}>
                <div
                  className="hover-show-container d-flex flex-row justify-content-start align-items-center pointer"
                  data-toggle="modal"
                  data-target={"#editCategoryModal" + category.id}
                >
                  <h1 className="display-4">{category.name}</h1>
                  <FontAwesomeIcon className="ml-3 hover-show" icon={faEdit} />
                </div>
                <EditCategoryModal
                  handleTaskCreate={this.handleTaskCreate}
                  category={category}
                />
                {this.props.tasks.map((task) => {
                  if (task.category_id === category.id) {
                    return (
                      <div key={task.id}>
                        <div
                          className="hover-show-container d-flex flex-row justify-content-start align-items-center m-1 pointer"
                          data-toggle="modal"
                          data-target={"#editTaskModal" + task.id}
                        >
                          <p
                            key={task.id}
                            style={
                              task.complete
                                ? { color: "#03fc20" }
                                : { color: "white" }
                            }
                            className={"lead m-0 " + task.status}
                          >
                            {task.description}
                          </p>
                          <FontAwesomeIcon
                            className="ml-3 hover-show"
                            icon={faEdit}
                          />
                        </div>
                        <EditTaskModal task={task} />
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
          <FontAwesomeIcon icon={faPlus} className="fa-3x fade-hover" />
        </div>
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
    categories: state.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { ...taskActions, ...listActions, ...categoryActions },
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);

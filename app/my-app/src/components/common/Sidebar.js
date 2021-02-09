import React from "react";
import { connect } from "react-redux";
import * as listActions from "../../redux/actions/listActions.js";
import * as taskActions from "../../redux/actions/taskActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

class Sidebar extends React.Component {
  state = {
    listInput: "",
  };

  componentDidMount() {
    this.props.actions.loadLists(this.props.user);
  }

  handleClick = async (list) => {
    await this.props.actions.selectList(list);
    await this.props.actions.loadTasks(list.id);
    this.props.history.push("/ToDo");
  };

  handleAddClick = () => {
    this.props.actions.createList(this.props.user, this.state.listInput);
    this.setState({ listInput: "" });
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ listInput: event.target.value });
  };

  render() {
    return (
      <div className="sidebar d-flex flex-column">
        <ul className="list-group list-group-flush flex-fill">
          {this.props.lists.map((list) => {
            return (
              <li
                key={list.id}
                onClick={() => this.handleClick(list)}
                className="list-group-item pointer"
              >
                {list.name}
              </li>
            );
          })}
        </ul>
        <div className="input-group d-flex border-top border-dark">
          <input
            type="text"
            className="form-control"
            placeholder="New list"
            value={this.state.listInput}
            onChange={this.handleChange}
          />
          <div className="input-group-append d-flex justify-content-between align-items-center p-1 m-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus"
              viewBox="0 0 16 16"
              onClick={this.handleAddClick}
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lists: state.lists.all,
    user: state.users.active,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...listActions, ...taskActions }, dispatch),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Sidebar)
);

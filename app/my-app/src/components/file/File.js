import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as listActions from "../../redux/actions/listActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import List from "../file/List.js";
import DropdownInput from "../common/DropdownInput.js";

class File extends React.Component {
  state = {
    list: {
      name: "",
    },
  };

  componentDidMount() {
    this.props.actions.loadLists(this.props.user);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.actions.createList(this.props.user, this.state.list.name);
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ list: { name: event.target.value } });
  };

  handleClick = (list) => {
    console.log(list);
    this.props.actions.selectList(list);
  };

  render() {
    return (
      <>
        <DropdownInput
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          value={this.state.list.name}
          placeholder="Enter descriptive name for your list"
          title="Task List"
          comment=""
        />

        <div className="jumbotron jumbotron-fluid gradient-h text-light">
          <div className="container">
            <h1 className="display-4">Please select a task list</h1>
            <p>
              You must select a task list in order to create tasks, subtasks and
              all other features
            </p>
          </div>
        </div>
      </>
    );
  }
}

File.propTypes = {
  lists: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    lists: state.lists.all,
    user: state.users.active,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(listActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(File);

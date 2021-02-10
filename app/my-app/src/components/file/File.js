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
    console.log("file rendered");
    return (
      <div className="text-light gradient-h fade-in p-5">
        <h1 className="display-4">Select or create a task list</h1>
        <p>
          You must select a task list in order to create tasks, subtasks and use
          all other features. Use the left side menu to select or create new
          task lists.
        </p>
      </div>
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

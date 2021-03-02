import React from "react";
import ListsFlex from "../todo/ListsFlex.js";
import { connect } from "react-redux";
import * as listActions from "../../redux/actions/listActions";
import * as taskActions from "../../redux/actions/taskActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class File extends React.Component {
  state = {
    list: {
      name: "",
    },
  };

  componentDidMount() {
    console.log("hi");
  }

  render() {
    return (
      <div className="text-light gradient-h fade-in p-5">
        <h1 className="display-4">Select or create a task list</h1>
        <p>
          You must select a task list in order to create tasks, subtasks and use
          all other features. Use the left side menu to select or create new
          task lists.
        </p>
        <ListsFlex
          onClick={(list) => {
            this.props.actions.selectList(list);
            this.props.actions.loadTasks(list.id);
            this.props.history.push("/ToDo");
          }}
          lists={this.props.lists}
        />
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
    actions: bindActionCreators({ ...listActions, ...taskActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(File);

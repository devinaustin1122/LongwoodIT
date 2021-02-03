import React from "react";
import { connect } from "react-redux";
import * as taskActions from "../../redux/actions/taskActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Task from "../todo/Task.js";

class File extends React.Component {
  componentDidMount() {
    this.props.actions.loadTasks();
  }

  onCreateSubmit = (event) => {
    event.preventDefault();
  };

  onLoadSubmit = (event) => {
    event.preventDefault();
  };

  onDeleteSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="jumbotron jumbotron-fluid text-light gradient-h fade-in">
        <div className="container">
          <h1 className="display-4 text-light">Add a new task list</h1>
          <form onSubmit={this.onCreateSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="List name"
                aria-label="List name"
              />
              <div className="input-group-append">
                <button className="btn btn-secondary" type="submit">
                  Add
                </button>
              </div>
            </div>
          </form>
          {this.props.tasks.map((task) => {
            return (
              <>
                <hr />
                <Task key={task.id} task={task} />
              </>
            );
          })}
        </div>
      </div>
    );
  }
}

File.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(File);

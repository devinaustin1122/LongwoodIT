import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as taskActions from "../../../redux/actions/taskActions.js";

function EditCategoryModal(props) {
  const [task, setTask] = useState(props.task.description);
  const [complete, setComplete] = useState(props.task.complete);

  function handleTaskChange(event) {
    event.preventDefault();
    setTask(event.target.value);
  }

  return (
    <div
      className="modal fade text-dark"
      id={"editTaskModal" + props.task.id}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="editTaskModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editTaskModalLabel">
              Edit task
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="input-group mb-3">
              <input
                value={task}
                onChange={handleTaskChange}
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="taskComplete"
                checked={complete}
                onChange={() => setComplete(!complete)}
              />
              <label className="form-check-label" htmlFor="taskComplete">
                Complete
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              data-dismiss="modal"
              onClick={() => {
                props.actions.editTask(task, props.task.id);
                if (complete) {
                  props.actions.taskStatus(props.task.id, complete);
                } else {
                  props.actions.taskStatus(props.task.id, complete);
                }
              }}
              type="button"
              className="btn btn-primary"
            >
              Save
            </button>
            <button
              data-dismiss="modal"
              onClick={() => props.actions.deleteTask(props.task.id)}
              type="button"
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.users.active,
    list: state.lists.active,
    tasks: state.tasks.all,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(taskActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryModal);

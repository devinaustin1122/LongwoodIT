import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as taskActions from "../../../redux/actions/taskActions.js";

function EditCategoryModal(props) {
  const [task, setTask] = useState("");

  function handleTaskChange(event) {
    event.preventDefault();
    setTask(event.target.value);
  }

  return (
    <div
      className="modal fade text-dark"
      id={"editCategoryModal" + props.category.id}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="editCategoryModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editCategoryModalLabel">
              {props.category.name}
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
            <h5 className="lead">Add tasks</h5>
            <div className="input-group mb-3">
              <input
                value={task}
                onChange={handleTaskChange}
                type="text"
                className="form-control"
              />
              <div className="input-group-append">
                <span
                  className="input-group-text"
                  id="basic-addon2"
                  onClick={() => {
                    props.actions.saveTask(
                      task,
                      props.list.id,
                      props.category.id
                    );
                    props.handleTaskCreate();
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </span>
              </div>
            </div>
            {props.tasks.map((task) => {
              if (task.category_id === props.category.id)
                return (
                  <p key={task.id} className="bold m-1 ml-3">
                    {task.description}
                  </p>
                );
            })}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
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

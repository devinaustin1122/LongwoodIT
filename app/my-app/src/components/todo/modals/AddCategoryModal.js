import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../../redux/actions/categoryActions.js";

function AddCategoryModal(props) {
  const [category, setCategory] = useState("");

  function handleCategoryChange(event) {
    event.preventDefault();
    setCategory(event.target.value);
  }

  return (
    <div
      className="modal fade text-dark"
      id="addCategoryModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="addCategoryModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addCategoryModalLabel">
              Add category
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
                value={category}
                onChange={handleCategoryChange}
                type="text"
                className="form-control"
              />
              <div className="input-group-append">
                <span
                  className="input-group-text"
                  id="basic-addon2"
                  onClick={() => {
                    props.actions.saveCategory(category, props.list.id);
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </span>
              </div>
            </div>
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
    actions: bindActionCreators(categoryActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryModal);

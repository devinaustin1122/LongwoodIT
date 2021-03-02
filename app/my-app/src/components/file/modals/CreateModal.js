import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as listActions from "../../../redux/actions/listActions.js";

function CreateModal(props) {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  function handleCategoryChange(event) {
    event.preventDefault();
    setCategory(event.target.value);
  }

  function handleNameChange(event) {
    event.preventDefault();
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    event.preventDefault();
    setDescription(event.target.value);
  }

  function handleAddCategory(name) {
    setCategories(categories.concat(name));
  }

  return (
    <div
      className="modal fade"
      id="createModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="createModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Create a list
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
            <h5 className="lead">Name</h5>
            <input
              value={name}
              onChange={handleNameChange}
              type="text"
              className="form-control"
            />
            <hr />
            <h5 className="lead">Description</h5>
            <input
              value={description}
              onChange={handleDescriptionChange}
              type="text"
              className="form-control"
            />
            <hr />
            <h5 className="lead">Categories</h5>
            <div className="input-group mb-3">
              <input
                value={category}
                onChange={handleCategoryChange}
                type="text"
                className="form-control"
              />
              <div
                className="input-group-append"
                onClick={() => handleAddCategory(category)}
              >
                <span className="input-group-text" id="basic-addon2">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
              </div>
            </div>
            {categories.map((category) => {
              return (
                <p key={category} className="bold m-1 ml-3">
                  {category}
                </p>
              );
            })}
          </div>
          <div className="modal-footer">
            <button
              onClick={() => {
                props.actions.createList(
                  props.user,
                  name,
                  description,
                  categories
                );
                props.actions.loadLists(props.user);
              }}
              type="button"
              className="btn btn-primary"
            >
              Create
            </button>

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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(listActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);

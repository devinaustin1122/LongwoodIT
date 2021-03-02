import React from "react";
import Lists from "../../todo/Lists.js";

function EditCategoryModal(props) {
  return (
    <div
      className="modal fade"
      id="editCategoryModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="editCategoryModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel"></h5>
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
            {/* <Lists onClick={props.onClick} lists={props.lists} /> */}
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

export default EditCategoryModal;

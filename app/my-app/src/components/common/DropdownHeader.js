import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowsAltV,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

const DropdownHeader = (props) => {
  return (
    <div className="jumbotron jumbotron-fluid m-0 p-0">
      <div className="collapse fade show ml-3 p-2" id="collapser">
        <h1 className="display-4">{props.title}</h1>
        <p className="lead">{props.comment}</p>
      </div>
      <div className="d-flex pl-2 justify-content-between align-items-center border-top">
        <FontAwesomeIcon
          className="mr-auto pointer"
          data-toggle="collapse"
          data-target="#collapser"
          icon={faArrowsAltV}
        />
        {props.handleDelete && (
          <FontAwesomeIcon
            className="m-2 pointer"
            icon={faTrash}
            onClick={props.handleDelete}
          />
        )}
        <FontAwesomeIcon
          className="m-2 pointer"
          icon={faEdit}
          // onClick={props.handleDelete}
        />
      </div>
    </div>
  );
};

export default DropdownHeader;

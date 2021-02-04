import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const List = (props) => {
  return (
    <div className="row fade-in">
      <div className="col-11">
        <p className="lead m-0 task">{props.list.name}</p>
      </div>
      <div className="col-1">
        <Link to={"ToDo/" + props.list.name}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#ffffff"
            className="bi bi-arrows-fullscreen m-2"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"
            />
          </svg>
        </Link>
      </div>
      <hr />
    </div>
  );
};

List.propTypes = {};

export default List;

import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as taskActions from "../../redux/actions/taskActions";
import { bindActionCreators } from "redux";

const Task = (props) => {
  return (
    <div className="row fade-in">
      <div className="col-11">
        <p className="lead m-0 task">{props.task.description}</p>
      </div>
      <div className="col-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#ffffff"
          className="bi bi-arrows-fullscreen m-2 pointer"
          onClick={() => props.handleClick(props.task)}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"
          />
        </svg>
      </div>
      <hr />
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(taskActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(Task);

import React from "react";
import { withRouter } from "react-router-dom";
import OpenModal from "../file/modals/OpenModal.js";
import CreateModal from "../file/modals/CreateModal.js";
import * as listActions from "../../redux/actions/listActions";
import * as taskActions from "../../redux/actions/taskActions";
import * as categoryActions from "../../redux/actions/categoryActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faEdit,
  faPlus,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

class Toolbar extends React.Component {
  async componentDidMount() {
    await this.props.actions.loadLists(this.props.user);
  }

  render() {
    return (
      <>
        <div
          className="btn-toolbar border-top justify-content-end bg-light"
          role="toolbar"
        >
          <div className="btn-group" role="group" aria-label="First group">
            <button
              type="button"
              className="btn btn-clear border-left"
              data-toggle="modal"
              data-target="#openModal"
            >
              <FontAwesomeIcon icon={faFolderOpen} />
            </button>
            <button
              type="button"
              className="btn btn-clear border-left"
              data-toggle="modal"
              data-target="#createModal"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button
              type="button"
              className="btn btn-clear border-left"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <FontAwesomeIcon icon={faQuestionCircle} />
            </button>
          </div>
        </div>
        <OpenModal
          onClick={(list) => {
            this.props.actions.selectList(list);
            this.props.actions.loadTasks(list.id);
            this.props.actions.loadCategories(list.id);
            this.props.history.push("/ToDo");
          }}
          lists={this.props.lists}
        />
        <CreateModal />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    lists: state.lists.all,
    user: state.users.active,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { ...listActions, ...taskActions, ...categoryActions },
      dispatch
    ),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Toolbar)
);
